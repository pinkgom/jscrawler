var url = "http://jpub.tistory.com/";
var savepath = "test.html";

var fs = require('fs');
var http = require('http');

var outfile = fs.createWriteStream(savepath);

http.get(url, function(res) {
    res.pipe(outfile);
    res.on('end', function() {
        outfile.close();
        console.log("downdload finished");
    });
});