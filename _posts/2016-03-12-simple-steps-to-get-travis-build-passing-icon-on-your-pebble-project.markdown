---
layout:     post
title:      "Simple steps to add Travis CI to your Pebble project repo on Github"
date:       2016-03-12 12:00:00
author:     "Yaoyu Yang"
header-img: ""
---

I have been working on a Pebble watch app called [CatchOneBus](https://apps.getpebble.com/en_US/application/55331752ac075102f30000a7) for almost a year. The project's [source code](https://github.com/sunshineyyy/CatchOneBus) is hosted on Github and I want to add integration with [Travis CI](https://travis-ci.org/) to have that cool [![Build Status](https://travis-ci.org/sunshineyyy/CatchOneBus.svg?branch=master)](https://travis-ci.org/sunshineyyy/CatchOneBus) icon light up! Even though lighting up the icon is my biggest motivation for now, [Travis CI](https://travis-ci.org/) is way more than an icon for sure. Travis CI is a continuous integration service used to build and test software projects hosted at GitHub. Simply speaking, it can run your project on a machine in the cloud as if you are running the project on your local machine and tell you if it can run successfully or not. Using Travis also gives you the confidence that it has been tested on other machines other than your local machine.

Anyway, here are the steps for add Travis CI in your Pebble app project repo:

* Add [Travis CI integration](https://github.com/integrations/travis-ci) to your Github by clicking [Add to Github](https://github.com/integrations/travis-ci).

* Head to your [Travis CI profile page](https://travis-ci.org/profile) and flick the repository switch on for your pebble project repo.

* Add a `.travis.yml` into your Github Pebble project repo. You open [this](https://github.com/sunshineyyy/CatchOneBus/blob/master/.travis.yml) and copy or directly copy the following code snippet into your `.travis.yml` file.  
{% highlight bash %}
sudo: false
language: python
python:
  - "2.7"

env:
  - PEBBLE_SDK_VERSION=3.10.1

before_install:
  - wget https://s3.amazonaws.com/assets.getpebble.com/pebble-tool/pebble-sdk-4.2.1-linux64.tar.bz2
  - mkdir -p ~/.pebble-sdk
  - tar -jxf pebble-sdk-* -C ~/.pebble-sdk
  - touch ~/.pebble-sdk/ENABLE_ANALYTICS
  - export PEBBLE_SDK=~/.pebble-sdk/pebble-sdk-*
  - export PEBBLE=$PEBBLE_SDK/bin/pebble

install:
  - pushd $PEBBLE_SDK
  - virtualenv --no-site-packages .env
  - source .env/bin/activate
  - pip install -r requirements.txt
  - deactivate
  - popd
  - $PEBBLE sdk set-channel beta
  - yes | $PEBBLE sdk install $PEBBLE_SDK_VERSION

script:
  - $PEBBLE build
{% endhighlight %}

* Trigger your first build with a git push.

* Head over to [Travis CI](https://travis-ci.org/). Once it's finishing building , the text and icon color will turn to green. Click the [![Build Status](https://travis-ci.org/sunshineyyy/CatchOneBus.svg?branch=master)](https://travis-ci.org/sunshineyyy/CatchOneBus) icon next to the <i class="fa fa-github fa-2x"></i> icon. Select MARKDOWN and copy the code into your README.md file.

* You should now see the cool [![Build Status](https://travis-ci.org/sunshineyyy/CatchOneBus.svg?branch=master)](https://travis-ci.org/sunshineyyy/CatchOneBus) icon light up in your project repo!
