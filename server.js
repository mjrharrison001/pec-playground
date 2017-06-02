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
  + '/json?location=44.0003,-77.2505&radius=20000&type=restaurant&'
  + 'keyword=&key='
  + key;

var detailedStoreInformation = []; //array of information for each store
app.get('/diners', function(req, res) {
  baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch'
    + '/json?location=44.0003,-77.2505&radius=20000&type=restaurant&'
    + 'keyword=&key='
    + key;
  //data not yet loaded into memory
  if(detailedStoreInformation.length <= 0){
    var placeId = [];
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

      if (statusCode == 200){
        //get all place Ids and store them in placeId
        for (var i = 0; i < body.results.length; i++){
          placeId.push(body.results[i].place_id);
        }
        //loop through each placeId and get detailed store information
        var lockCounter = placeId.length;

        for(var i = 0; i < placeId.length; i++){
          /**detailed store information API call BEGIN**/
          url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='
            + placeId[i]
            + '&key='
            + key;

          var options = {
            method: 'GET',
            jar : true,
            json: true,
            url: url
          }
          request(options, function (err, response, bodyD) {
            if (err) {
              console.error('error posting json: ', err);
              throw err;
            }
            var headers = response.headers;
            var statusCode = response.statusCode;
            //console.log(bodyD.result);
            if (statusCode == 200){

              var data = {
                'name':             bodyD.result.name,
                'location':         bodyD.result.vicinity,
                'url':              bodyD.result.url,
                'rating':           bodyD.result.rating,
                'price':            bodyD.result.prince_level,
                'numberOfReviews':  bodyD.result.reviews.length,
                'hours':            bodyD.result.weekday_text,
                'icon':             bodyD.result.icon,
                'phoneNumber':      bodyD.result.formatted_phone_number,
                'lat':              bodyD.result.geometry.location.lat,
                'lng':              bodyD.result.geometry.location.lng,
                'id':               bodyD.result.id
              };
              if (typeof bodyD.result.photos != 'undefined'){
                var photoId = bodyD.result.photos[0].photo_reference;
                var photoUrl_token = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
                  +  photoId
                  + '&key='
                  + key;
                var options = {
                  method: 'GET',
                  jar : true,
                  json: true,
                  url: photoUrl_token
                }
                request(options, function (err, response, bodyP) {
                  if (err) {
                    console.error('error posting json: ', err);
                    throw err;
                  }
                  var headers = response.headers;
                  var statusCode = response.statusCode;
                  var uri = response.request.uri.href;
                  data.photoUrl = uri;

                  detailedStoreInformation.push(data);
                  lockCounter--;
                  if (lockCounter <= 0){
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(detailedStoreInformation));
                  }
                });
              }
              else{
                data.photoUrl = null;

                detailedStoreInformation.push(data);
                lockCounter--;
                if (lockCounter <= 0){
                  res.setHeader('Content-Type', 'application/json');
                  res.send(JSON.stringify(detailedStoreInformation));
                }
              }
            }
          });
          /**detailed store information API call END**/
        }
      }
      else{
        var err_msg = {
          'msg': 'error reaching API'
        };
        console.log(baseUrl);
        res.send(JSON.stringify(err_msg));
      }
    });
  }
  else{ //data already loaded since last push
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(detailedStoreInformation));
  }
});


var detailedShopInformation = []; //array of information for each store
app.get('/shops', function(req, res) {
  baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch'
    + '/json?location=44.0003,-77.2505&radius=20000&type=store&'
    + 'keyword=&key='
    + key;
  //data not yet loaded into memory
  if(detailedShopInformation.length <= 0){
    var placeId = [];
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

      if (statusCode == 200){
        //get all place Ids and store them in placeId
        for (var i = 0; i < body.results.length; i++){
          placeId.push(body.results[i].place_id);
        }
        //loop through each placeId and get detailed store information
        var lockCounter = placeId.length;

        for(var i = 0; i < placeId.length; i++){
          /**detailed store information API call BEGIN**/
          url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='
            + placeId[i]
            + '&key='
            + key;

          var options = {
            method: 'GET',
            jar : true,
            json: true,
            url: url
          }
          request(options, function (err, response, bodyD) {
            if (err) {
              console.error('error posting json: ', err);
              throw err;
            }
            var headers = response.headers;
            var statusCode = response.statusCode;
            //console.log(bodyD.result);
            if (statusCode == 200){

              var data = {
                'name':             bodyD.result.name,
                'location':         bodyD.result.vicinity,
                'url':              bodyD.result.url,
                'rating':           bodyD.result.rating,
                'price':            bodyD.result.prince_level,
                'numberOfReviews':  bodyD.result.reviews.length,
                'hours':            bodyD.result.weekday_text,
                'icon':             bodyD.result.icon,
                'phoneNumber':      bodyD.result.formatted_phone_number,
                'lat':              bodyD.result.geometry.location.lat,
                'lng':              bodyD.result.geometry.location.lng,
                'id':               bodyD.result.id
              };
              if (typeof bodyD.result.photos != 'undefined'){
                var photoId = bodyD.result.photos[0].photo_reference;
                var photoUrl_token = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
                  +  photoId
                  + '&key='
                  + key;
                var options = {
                  method: 'GET',
                  jar : true,
                  json: true,
                  url: photoUrl_token
                }
                request(options, function (err, response, bodyP) {
                  if (err) {
                    console.error('error posting json: ', err);
                    throw err;
                  }
                  var headers = response.headers;
                  var statusCode = response.statusCode;
                  var uri = response.request.uri.href;
                  data.photoUrl = uri;

                  detailedShopInformation.push(data);
                  lockCounter--;
                  if (lockCounter <= 0){
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(detailedStoreInformation));
                  }
                });
              }
              else{
                data.photoUrl = null;

                detailedShopInformation.push(data);
                lockCounter--;
                if (lockCounter <= 0){
                  res.setHeader('Content-Type', 'application/json');
                  res.send(JSON.stringify(detailedShopInformation));
                }
              }
            }
          });
          /**detailed store information API call END**/
        }
      }
      else{
        var err_msg = {
          'msg': 'error reaching API'
        };
        console.log(baseUrl);
        res.send(JSON.stringify(err_msg));
      }
    });
  }
  else{ //data already loaded since last push
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(detailedShopInformation));
  }
});

var detailedWineInformation = []; //array of information for each store
app.get('/wineries', function(req, res) {
  baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch'
    + '/json?location=44.0003,-77.2505&radius=20000&type=wine&'
    + 'keyword=&key='
    + key;
  //data not yet loaded into memory
  if(detailedWineInformation.length <= 0){
    var placeId = [];
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

      if (statusCode == 200){
        //get all place Ids and store them in placeId
        for (var i = 0; i < body.results.length; i++){
          placeId.push(body.results[i].place_id);
        }
        //loop through each placeId and get detailed store information
        var lockCounter = placeId.length;

        for(var i = 0; i < placeId.length; i++){
          /**detailed store information API call BEGIN**/
          url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='
            + placeId[i]
            + '&key='
            + key;

          var options = {
            method: 'GET',
            jar : true,
            json: true,
            url: url
          }
          request(options, function (err, response, bodyD) {
            if (err) {
              console.error('error posting json: ', err);
              throw err;
            }
            var headers = response.headers;
            var statusCode = response.statusCode;
            //console.log(bodyD.result);
            if (statusCode == 200){

              var data = {
                'name':             bodyD.result.name,
                'location':         bodyD.result.vicinity,
                'url':              bodyD.result.url,
                'rating':           bodyD.result.rating,
                'price':            bodyD.result.prince_level,
                'numberOfReviews':  bodyD.result.reviews.length,
                'hours':            bodyD.result.weekday_text,
                'icon':             bodyD.result.icon,
                'phoneNumber':      bodyD.result.formatted_phone_number,
                'lat':              bodyD.result.geometry.location.lat,
                'lng':              bodyD.result.geometry.location.lng,
                'id':               bodyD.result.id
              };
              if (typeof bodyD.result.photos != 'undefined'){
                var photoId = bodyD.result.photos[0].photo_reference;
                var photoUrl_token = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
                  +  photoId
                  + '&key='
                  + key;
                var options = {
                  method: 'GET',
                  jar : true,
                  json: true,
                  url: photoUrl_token
                }
                request(options, function (err, response, bodyP) {
                  if (err) {
                    console.error('error posting json: ', err);
                    throw err;
                  }
                  var headers = response.headers;
                  var statusCode = response.statusCode;
                  var uri = response.request.uri.href;
                  data.photoUrl = uri;

                  detailedWineInformation.push(data);
                  lockCounter--;
                  if (lockCounter <= 0){
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(detailedWineInformation));
                  }
                });
              }
              else{
                data.photoUrl = null;

                detailedWineInformation.push(data);
                lockCounter--;
                if (lockCounter <= 0){
                  res.setHeader('Content-Type', 'application/json');
                  res.send(JSON.stringify(detailedWineInformation));
                }
              }
            }
          });
          /**detailed store information API call END**/
        }
      }
      else{
        var err_msg = {
          'msg': 'error reaching API'
        };
        console.log(baseUrl);
        res.send(JSON.stringify(err_msg));
      }
    });
  }
  else{ //data already loaded since last push
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(detailedWineInformation));
  }
});

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
