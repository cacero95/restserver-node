const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// con estos metodos preparo el proyecto a recivir JSON
// parse application/json
app.use(bodyParser.json());

// Initialize
const oauth = OAuth({
    consumer: {
        key: 'hArIyoVy0lP8nOf2kV8xKeZ6I',
        secret: 'iy5R0dfr7ngLz4YcXc6ZTT19lAbxay1OkbKFbLcO30pwxA6nyd'
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});
app.get('https://api.twitter.com/1.1/search/tweets.json?q=basket', (res, req) => {

})
const request_data = {
    url: 'https://api.twitter.com/1.1/search/tweets.json?q=basket',
    method: 'GET'

};

// Note: The token is optional for some requests
const token = {
    key: '2355469728-mHnWjplpYnrLf2SxB5hnuAPQ8ezU6gIdV3nVcpi ',
    secret: '6YZsUnwiSvUASMAE3SXS5oZcm2z89ej1VnEFzqS8BNFzz'
};


console.log(oauth.toHeader(oauth.authorize(request_data, token)));

request({

    url: request_data.url,
    method: request_data.method,
    form: oauth.authorize(request_data, token),
    headers: oauth.toHeader(oauth.authorize(request_data, token))

}, function(error, response, body) {
    console.log(response);
});