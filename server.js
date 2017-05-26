// server.js
const express = require('express');
const app = express();
const path = require('path');

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
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

var key = 'AIzaSyDX4a7ppdimXP4Tny0UCOmvPW7xBiPyFc4';
var baseUrls = 'https://maps.googleapis.com/maps/api/place/nearbysearch'
  + '/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&'
  + 'keyword=cruise&key='
  + key;

app.get('/diners', function(req, res) {
  res.send("test");
});

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
