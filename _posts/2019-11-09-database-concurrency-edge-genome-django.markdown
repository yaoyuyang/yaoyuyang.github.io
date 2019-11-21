---
layout:     post
title:      "Solving a database concurrency problem in a Django based genome tracking software"
date:       2019-11-09 18:00:00
author:     "Yaoyu Yang"
header-img: ""
---

# The Problem
Recently I've been working on a bug fix for an open source software called [Edge](https://github.com/ginkgobioworks/edge), which is used in [Ginkgo Bioworks](https://github.com/ginkgobioworks/) for tracking genome changes efficiently. Edge keeps structural changes between a genome and child genomes derived from it. Edge does not store child genomes as brand new genomes and only store the changes, therefore is very space efficient. The bug is related to manage concurrency when making genome changes. Previous version of the code does lock the genome that is subject to change. The code for database lock is [here](https://github.com/ginkgobioworks/edge/blob/d675b24ca541f325298cc67fb458bfcf6deb18f7/src/edge/recombine.py#L556).
{% highlight python %}
locked_genome = Genome.objects.select_for_update().filter(pk=genome.id)
locked_genome = list(locked_genome)
genome = locked_genome[0]
{% endhighlight %}
If you look at this code the first time, you would think this code already solved the concurrency problem since we locked the genome we are about to make change. However, if you look into Edge's data structure, you will realize this lock may work for some cases but opens doors for potential data corruption. The reason is the following: Edge stores Genome sequences as a linked list of [Chunks](https://github.com/ginkgobioworks/edge/blob/master/src/edge/models/chunk.py#L80). During genome change event, for example, integrating a new 50 bp sequence into the genome, the chunks are usually broken down into smaller Chunks to make tracking and storing sequences easier. The trick is that child, parent, and parent's ancestor genomes will all share these same smaller chunks for the parts that are the same across them. Therefore, during a genome change event, we are not only modifying the parent and child genome data, we are also modifying all parent's ancestors genomes because we are updating how their shared sequence are stored and represented in Chunks. Therefore, if two genomes share the same Chunks are concurrently performing genome changes, since we only lock the genome row, the Chunks rows could overwrite each other and resulting in unexpected changes.
# The Solution
The solution we came up with is actually pretty neat. Instead of locking the genome we are about to change, we lock the root genome. Any other genomes that share the same Chunks are going to have the same root genome, therefore, they will need to lock the same root genome if they were to perform the change at the same time. Thus, we can issue the concurrent genome changes safely. This will allow us to perform true parallel genome changes when genomes don't share the same root genome while avoiding possible data corruption if we are performing parallel genome changes for genomes that do share the same root genome.
We coded up this solution in this [Pull Request](https://github.com/ginkgobioworks/edge/pull/33), where we added a function to find the root genome:
{% highlight python %}
def find_root_genome(genome):
    root_genome = genome
    while root_genome.parent_id:
        root_genome = Genome.objects.get(pk=root_genome.parent_id)
    return root_genome
{% endhighlight %}
and a line of code to lock the root genome whenever we are starting to make the genome change in database.
{% highlight python %}
Genome.objects.select_for_update().filter(pk=find_root_genome(genome).id)
{% endhighlight %}
# The Gotchas
We thought the above code would solve the problem, however, after we deployed this change to staging, we did not find the root genome locked during the genome change transaction. The trick we used to find that the root genome was not locked was to add a print statement after the lock code, a 10 seconds delay, and another print statement just before the transaction finishes.
{% highlight python %}
import time
Genome.objects.select_for_update().filter(pk=find_root_genome(genome).id)
print(f'Start genome change for {genome.id}')
time.sleep(10)
...
print('Genome change for {genome.id} about to finish')
{% endhighlight %}
We issue genome changes to `g1` and `g2` that share the same root genome `g0` at about the same time, we would expect the sets of print statements from two genome changes one after another, not interleaving. Basically, we would expect the log looks like:
{% highlight text %}
Start genome change for g1
Genome change for g1 about to finish
Start genome change for g2
Genome change for g2 about to finish
{% endhighlight %}
However, we actually saw:
{% highlight text %}
Start genome change for g1
Start genome change for g2
Genome change for g1 about to finish
Genome change for g2 about to finish
{% endhighlight %}
This means that the lock on root genome `g0` did not happen. So we started to take another look at the Django doc for [select_for_update](https://docs.djangoproject.com/en/2.2/ref/models/querysets/#select-for-update) and this text `When the queryset is evaluated (for entry in entries in this case), all matched entries will be locked ` made us realize that just doing
{% highlight python %}
Genome.objects.select_for_update().filter(pk=find_root_genome(genome).id)
{% endhighlight %}
will actually not lock the root genome since the queryset is not actually evaluated. Then we went on and updated the code in this [Pull Request](https://github.com/ginkgobioworks/edge/pull/35) where we basically did:
{% highlight python %}
genomes = Genome.objects.select_for_update().filter(pk=find_root_genome(genome).id)
# Lock only happens when queryset is evaluated, therefore need to do at least genomes[0]

genome = genomes[0]
{% endhighlight %}
After this change, the log looks as expected when we make two concurrent genome changes that share the same root genome. Problem solved!
# Things we learned:

* One trick to solve the concurrency problem is to lock common resources during database traction, even the common resources are not the resources to be updated in the transaction. Here we used this trick to find the root genome that is common and locked it.
* `select_for_update` lock only happens when the Django queryset is [evaluated](https://docs.djangoproject.com/en/2.2/ref/models/querysets/#when-querysets-are-evaluated).

P.S. My team at [Ginkgo Bioworks](https://www.ginkgobioworks.com/) is hiring for dev positions at all levels. If you are interested in building software to engineer biology to make a dent in the universe, check out [here](https://www.ginkgobioworks.com/careers/)!
