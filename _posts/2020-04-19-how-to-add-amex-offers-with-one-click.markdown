---
layout:     post
title:      "How to add a list of Amex offers without clicking one at a time?"
date:       2020-04-16 18:00:00
author:     "Yaoyu Yang"
header-img: ""
---

# The Problem
American express credit cards come with [Amex offers](https://www.amexoffers.com/). You can read this [guide](https://thepointsguy.com/guide/ultimate-guide-to-amex-offers/) if you want to know more about Amex offers. The way to add the Amex offer is to log into Amex website and get to the UI like the following and click the button to add the offer one at a time. It's getting crazy when you have say 50 offers and you have to click 50 times to add all the offers. Can we do with one click instead?
![amex_offer](/images/blog/amex_offer.png){:class="img-responsive"}
# A Solution
A solution I came up is to run the following Javascript oneliner script in your browser console. For Chrome, you can get to the console by go to More Tools > Developer Tools. You can copy the following script and paste in the console and press return on your keyboard. Make sure you logged into the Amex website and clicked the View All to load all the offers before running the script.
{% highlight javascript %}
Array.from(document.querySelectorAll('div > div > div.col-sm-12.col-md-3.pad-0-l > div > button')).map(a => a.click())
{% endhighlight %}
After you run the script, you should see all added offers appear in the Added to Card tab.
# How it works
The script uses [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) to find all the elements that match [CSS selector](https://www.w3schools.com/css/css_selectors.asp) pattern of the `Add to Card` button, turn them into an [Array](https://developer.mozilla.org/en-US/docs/Glossary/array), and then apply `.click()` on each element to click the button. By running the script, you are basically using the script to click the buttons for you and this saves you from manually clicking the buttons one at a time.
# Shortcoming
This script depends on how the button is built in the Amex UI. If Amex updates the UI and the CSS selector pattern of `'div > div > div.col-sm-12.col-md-3.pad-0-l > div > button'`, then this script will not work. However, I'll try to update this script here if Amex updates their UI and changes the CSS selector pattern.

## Disclaimer
THE SCRIPT ABOVE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SCRIPT OR THE USE OR OTHER DEALINGS IN THE SCRIPT.
