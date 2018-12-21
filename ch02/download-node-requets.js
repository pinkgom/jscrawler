var request = require('request');
var fs = require('fs');

var url = "http://jpub.tistory.com/";
var savePath = "../output/crawling-download.html";

request(url).pipe(fs.createWriteStream(savePath));