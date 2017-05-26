// server.js
const express =   require('express');
const app =       express();
const path =      require('path');
var request  =    require('request');
var bodyParser =  require('body-parser');

/**USE WHEN PRODUCTION - SSL**/
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
// const forceSSL = function() {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(
//        ['https://', req.get('Host'), req.url].join('')
//       );
//     }
//     next();
//   }
// }
// Instruct the app
// to use the forceSSL
// middleware
//app.use(forceSSL());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
app.set('port', (process.env.PORT || 5000));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Start the app by listening on the default
// Heroku port
app.listen(app.get('port'), function() {
  console.log('PEC Playground running on port: ', app.get('port'));
});

var key = process.env.G_KEY;
var baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch'
  + '/json?location=44.0003,-77.2505&radius=500&type=restaurant&'
  + 'keyword=cruise&key='
  + key;

app.get('/diners', function(req, res) {
  var diners_token = [];
  var url = baseUrl;
  var options = {
    method: 'GET',
    jar : true,
    json: true,
    url: url
  }
  request(options, function (err, response, body) {
    if (err) {
      console.error('error posting json: ', err);
      throw err;
    }
    var headers = response.headers;
    var statusCode = response.statusCode;
    res.setHeader('Content-Type', 'application/json');

    if (statusCode == 200)
      res.send(JSON.stringify(body.results));

    else{
      var err_msg = {
        'msg': 'error reaching API'
      };
      res.send(JSON.stringify(err_msg));
    }

  });
});

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
