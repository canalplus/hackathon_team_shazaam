var url = require('url');
var fs = require('fs');
var crypto = require('crypto');
//npm install request
var request = require('request');
var express = require('express');
var cors = require('cors')
var app = express();
var port = 3001;

// Replace "###...###" below with your project's host, access_key and access_secret.
var defaultOptions = {
  host: 'identify-eu-west-1.acrcloud.com',
  endpoint: '/v1/identify',
  signature_version: '1',
  data_type:'audio',
  secure: true,
  access_key: '2a43bf03e173d19f0c5a66e049cb4cf7',
  access_secret: '8zzCMNLml6Niph2pQOYMhjVCIUnY2lH3LMk20y1R'
};

function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
}

function sign(signString, accessSecret) {
  return crypto.createHmac('sha1', accessSecret)
    .update(new Buffer(signString, 'utf-8'))
    .digest().toString('base64');
}


/**
 * Identifies a sample of bytes
 */
function identify(data, options, cb) {

  var current_data = new Date();
  var timestamp = current_data.getTime()/1000;

  var stringToSign = buildStringToSign('POST',
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    timestamp);

  var signature = sign(stringToSign, options.access_secret);

  var formData = {
    sample: data,
    access_key:options.access_key,
    data_type:options.data_type,
    signature_version:options.signature_version,
    signature:signature,
    sample_bytes:data.length,
    timestamp:timestamp,
  }

  console.log('make request : '  +'http://'+options.host + options.endpoint);
  request.post({
    url: "http://"+options.host + options.endpoint,
    method: 'POST',
    formData: formData
  }, cb);
}

app.use(cors());

app.get('/id/:content/:offset', function (req, res) {
  var _snippet_id = Math.floor(req.params.offset / 15);
  var bitmap = fs.readFileSync('../script/postParse/'+req.params.content+'-'+_snippet_id+'.mp3');

  identify(new Buffer(bitmap), defaultOptions, function (err, httpResponse, body) {
    if (err) {
      console.log(err);
      res.status(500).send('error: '+err);
    } else {
      try {
        console.log(body);
        res.json(JSON.parse(body));
      } catch(e) {
        console.log(e);
        res.status(500).send('error: '+e);
      }
    }
  });
});

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});
