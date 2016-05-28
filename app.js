var express = require('express');
var app = express();
var http = require('http');
var querystring = require('querystring');
var request = require('request');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

/*// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});*/

app.get('/cams', function(req, _res){
    url = 'http://dotsignals.org/new-data.php?query='
    http.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            _res.json(JSON.parse(body));

        });
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });
})

app.get('/image', function(req, res) {
  var url = "http://207.251.86.238/cctv" + req.query.query+'.jpg?math='+Math.random();
  console.log(req.query.query, url);
  request.get(url).pipe(res);
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
