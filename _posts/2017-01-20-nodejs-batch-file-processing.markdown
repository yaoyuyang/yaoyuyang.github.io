---
layout:     post
title:      "How to read multiple files in Node.js asynchronously and process all file contents synchronously?"
date:       2017-01-20 12:00:00
author:     "Yaoyu Yang"
header-img: ""
---

The problem arose when I was working on a web application using Node.js and Angular JS, where I need to read multiple files in a directory, process the contents in all files aggregately, and write processed content into a new file. This problem is similar to [this stackoverflow question ("Reading all files in a directory, store them in objects, and send the object in node.js")](http://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object).

The specific problem I encountered was as follows. I have a list of json files in a directory each describe details of a fish with id, images, name, etc.

`/fish1.json`
{% highlight javascript %}
{
    "id": "Cod-Alaskan",
    "name": "Cod (Alaskan)",
    "images": [
        "img/fish/Cod (Alaskan)1.jpg",
        "img/fish/Cod (Alaskan)2.jpg"
    ],
    "mercury": 0
}
{% endhighlight %}
`/fish2.json`
{% highlight javascript %}
{
    "id": "Sole-Pacific",
    "name": "Sole (Pacific)",
    "images": [
        "img/fish/Sole (Pacific)1.jpg",
        "img/fish/Sole (Pacific)2.jpg",
    ],
    "mercury": 1
}
{% endhighlight %}
...

I want to process all these files and write to a summary file like this:
`/fishes.json`
{% highlight javascript %}
[
    {
        "name": "Cod (Alaskan)",
        "mercury": 0,
        "imageUrl": "img/fish/Cod (Alaskan)1.jpg",
        "id": "Cod-Alaskan"
    },
    {
        "name": "Sole (Pacific)",
        "mercury": 1,
        "imageUrl": "img/fish/Sole (Pacific)2.jpg",
        "id": "Sole-Pacific"
    },
    ...
]
{% endhighlight %}

Due to the async nature of Node.js, simply using `fs.readFile` would result in all files processed asynchronously. How can we know when all the reading has completed so we can start processing the results? For processing a single file, one could use callback function in javascript to achieve this easily, but for multiple files, it is not a good style as pointed out by [this stackoverflow answer](http://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object?answertab=active#tab-top). As suggested by this answer, one could either use sync versions of `fs` functions or Promises. Using sync versions of `fs` functions would block each file reading and possibly result in slow reading if you have a large number of files. Here I present the code snippet for using [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to solve this problem.

{% highlight javascript %}

var fs = require('fs');

// make Promise version of fs.readdir()
fs.readdirAsync = function(dirname) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dirname, function(err, filenames){
            if (err) 
                reject(err); 
            else 
                resolve(filenames);
        });
    });
};

// make Promise version of fs.readFile()
fs.readFileAsync = function(filename, enc) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, enc, function(err, data){
            if (err) 
                reject(err); 
            else
                resolve(data);
        });
    });
};

// utility function, return Promise
function getFile(filename) {
    return fs.readFileAsync(filename, 'utf8');
}

// example of using promised version of getFile
// getFile('./fish1.json', 'utf8').then(function (data){
//     console.log(data);
// });


// a function specific to my project to filter out the files I need to read and process, you can pretty much ignore or write your own filter function.
function isDataFile(filename) {
  return (filename.split('.')[1] == 'json' 
          && filename.split('.')[0] != 'fishes'
          && filename.split('.')[0] != 'fishes_backup')
}

// start a blank fishes.json file
fs.writeFile('./fishes.json', '', function(){console.log('done')});


// read all json files in the directory, filter out those needed to process, and using Promise.all to time when all async readFiles has completed. 
fs.readdirAsync('./').then(function (filenames){
    filenames = filenames.filter(isDataFile);
    console.log(filenames);
    return Promise.all(filenames.map(getFile));
}).then(function (files){
    var summaryFiles = [];
    files.forEach(function(file) {
      var json_file = JSON.parse(file);
      summaryFiles.push({ "name": json_file["name"],
                          "imageUrl": json_file["images"][0],
                          "id": json_file["id"]
                      });
    });
    fs.appendFile("./fishes.json", JSON.stringify(summaryFiles, null, 4), function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was appended!");
    });
});

{% endhighlight %}
