const $ = require("jquery");
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.twitter.com/1.1/search/tweets.json?q=tenis",
    "method": "GET",
    "headers": {
        "Authorization": "OAuth oauth_consumer_key=\"hArIyoVy0lP8nOf2kV8xKeZ6I\",oauth_token=\"2355469728-mHnWjplpYnrLf2SxB5hnuAPQ8ezU6gIdV3nVcpi\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1552522819\",oauth_nonce=\"JHo3Nb8rQet\",oauth_version=\"1.0\",oauth_signature=\"RudqJqY0XVDyfCajnT4SgFUQtTY%3D\"",
        "cache-control": "no-cache",
        "Postman-Token": "91308671-ed98-4745-9ce2-4f1ceca13f66"
    }
}

$.ajax(settings).done(function(response) {
    console.log(response);
});