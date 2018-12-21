var client = require('cheerio-httpcli');
var request = require('request');
var fs = require('fs');
var urlType = require('url');

var savedir = __dirname + "/../output/img";
if (!fs.existsSync(savedir)) {
  fs.mkdirSync(savedir);
}

var url = "https://ko.wikipedia.org/wiki/" + encodeURIComponent("강아지");
var param = {};

client.fetch(url, param, function(err, $, res) {
  if (err) {
    console.log("Error : ", err);
    return;
  }

  $("img").each(function(idx) {
    var src = $(this).attr("src");
    src = urlType.resolve(url, src);

    var filename = urlType.parse(src).pathname;
    console.log(filename);
    filename = savedir + "/" + filename.replace(/[^a-zA-Z0-9\.]+/g, '_');

    request(src).pipe(fs.createWriteStream(filename));
  });
})