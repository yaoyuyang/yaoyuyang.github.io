---
layout:     post
title:      "Starting to blog and code snippets to determine leap year!"
date:       2016-02-28 24:00:00
author:     "Yaoyu Yang"
header-img: "images/Pensieve2.jpg"
---

<p>It's the last day of February in 2016. This year is a <a href="https://en.wikipedia.org/wiki/Leap_year">leap year</a> so there is one extra day in February. The algorithm to determine a leap year is as follows: A year will be a leap year if it is divisible by 4 but not by 100. If a year is divisible by 4 and by 100, it is not a leap year unless it is also divisible by 400. It's a very simple algorithm, a very "naive" Ruby function to determine leap year will be like:</p>

{% highlight ruby %}
def leap_year? year
  if year%4 == 0
    if year%100 != 0
      true
    elsif year%400 == 0
      true
    else
      false
    end
  else
    false
  end
end
{% endhighlight %}

<p>Above code will give correct answer but it looks quite verbose, though a very good exercise using if, else and elsif. A more succinct code snippet looks like following:</p>

{% highlight ruby %}
def leap_year? year
  (year%4 == 0 && year%100 != 0) || (year%400 == 0)
end
{% endhighlight %}

<p>The logical operators are magic! Also noting that the above code uses the  implicit return in Ruby, whatever got evaluated last in the function got returned. This is a nice feature of Ruby in someway, saving you a few keystrokes and makes the code more like a human written paragraph of an article other than a piece of computer code. Whereas in Python, you have to explicitly write return, so the code for calculating leap year in python will look like:</p>

{% highlight python %}
def leap_year(year):
  return (year%4 == 0 and year%100 != 0) or (year%400 == 0)
{% endhighlight %}

<p>I use Ruby and Python a lot during everyday work and research, love both of them and always willing to learn more. The aim of this blog is to share my learning process and some knowledge of various kinds of technologies including but not limited to programming, app development, synthetic biology, etc. Looking forward to write more and learn more!</p>
