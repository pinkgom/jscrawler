var client = require('cheerio-httpcli');
var request = require('request');
var urlType = require('url');
var fs = require('fs');
var path = require('path');

var LINK_LEVEL = 3;
var TARGET_URL = "https://nodejs.org/dist/latest-v11.x/docs/api/";
var list = {};

downloadRec(TARGET_URL, 0);

function downloadRec(url, level) {
  if (level >= LINK_LEVEL) {
    return;
  }

  if (list[url]) {
    return;
  } else {
    list[url] = true;
  }

  var us = TARGET_URL.split("/");
  us.pop();

  var base = us.join("/");
  if (url.indexOf(base) < 0) {
    return;
  }

  client.fetch(url, {}, function(err, $, res) {
    $("a").each(function(idx) {
      var href = $(this).attr('href');
      if (!href) {
        return;
      }

      href = urlType.resolve(url, href);
      href = href.replace(/\#.+$/, "");
      downloadRec(href, level + 1);
    });

    if (url.substr(url.length - 1, 1) == '/') {
      url += "index.html";
    }
    var savepath = url.split("/").slice(2).join("/");
    checkSaveDir(savepath);
    console.log(savepath);
    fs.writeFileSync(savepath, $.html());

  });

}

function checkSaveDir(fname) {
  var dir = path.dirname(fname);
  var dirlist = dir.split("/");

  var p = "";
  for (var i in dirlist) {
    p += dirlist[i] + "/";
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }
}