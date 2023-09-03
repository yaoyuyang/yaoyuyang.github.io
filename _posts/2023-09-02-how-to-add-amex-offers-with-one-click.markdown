---
layout:     post
title:      "How to add a list of Amex offers without clicking one at a time?"
date:       2023-09-02 18:00:00
author:     "Yaoyu Yang"
header-img: ""
---

# The Problem
American Express credit cards come with [Amex offers](https://www.amexoffers.com/). You can read this [guide](https://www.doctorofcredit.com/amex-offers-an-introduction-profitable-examples/) or this [guide in Chinese](https://travelafterwork.com/2018/05/25/amex-offer-introduction/) if you want to know more about Amex offers. The way to add the Amex offer is to log into the Amex website get to the UI like the following and click the button to add the offer one at a time. It's getting crazy when you have say 100 offers and you have to click 100 times to add all the offers. Can we do it with one click instead?
![amex_offer](/images/blog/amex_offer.png){:class="img-responsive"}

# A Solution
A solution I came up with is to run the following Javascript oneliner script in your browser console. For Chrome, you can get to the console by going to More Tools > Developer Tools. You can copy the following script and paste into the console and press return on your keyboard. Make sure you log into the Amex website and click View All to load all the offers before running the script.
{% highlight javascript %}
offers = Array.from(document.querySelectorAll("button[title='Add to Card']"))
for (const offer of offers) {
  offer.click();
  await new Promise(r => setTimeout(r, 2000));
}
{% endhighlight %}
After you run the script, you should see all added offers appear in the Added to Card tab. You might need to do this again if you have more than 100 offers as Amex only loads 100 offers at a time.

# An even better solution using Bookmarklet
So I showed this script to my friend Henan Li and he came up with an even better solution utilizing this script with [Bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet). This allows you to run the script with one click on the bookmark section. This is easier than going to the developer console and running code. Follow the steps below:
* Create a new bookmark in Chrome by clicking on the bookmark section -> Add Page. If you use other browsers, just add a new bookmark following other browsers' UI.
* Enter a name you like (e.g. I name it Add Amex offer), and enter the following line in the URL section.
{% highlight javascript %}
javascript:offers=Array.from(document.querySelectorAll("button[title='Add to Card']"));c=()=>{ offer = offers.pop(); if (!offer) return console.log('Added all offers!'); offer.click(); setTimeout(c, 2000) };c();
{% endhighlight %}
* Go to the Amex website, log in to your account, load all the offers by clicking View All, click this bookmark, wait a bit and all your offers will be added automatically. You might need to do this again if you have more than 100 offers as Amex only loads 100 offers at a time.

# How it works
The script uses [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) to find all the elements that match [CSS selector](https://www.w3schools.com/css/css_selectors.asp) pattern of the `Add to Card` button, turn them into an [Array](https://developer.mozilla.org/en-US/docs/Glossary/array), and then apply `.click()` on each element to click the button. By running the script, you are basically using the script to click the buttons for you and this saves you from manually clicking the buttons one at a time.

# Shortcoming
This script depends on how the button is built in the Amex UI. If Amex updates the UI and the CSS selector pattern of `button[title='Add to Card']`, then this script will not work. However, I'll try to update this script here if Amex updates its UI and changes the CSS selector pattern.

## Disclaimer
THE SCRIPT ABOVE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SCRIPT OR THE USE OR OTHER DEALINGS IN THE SCRIPT.
