get_twitter = function() {
	var error = function (err, response, body) {
		console.log('ERROR [%s]', err);
	};

	var success = function (data) {
		console.log('Data [%s]', data);
	};

	var Twitter = require('twitter-js-client').Twitter;

	var items = {};
	$.getJSON("secret.json", function(data) {
	    $.each(data, function(key, val) {
	        items[key] = val;
	    });
	});

	var config = {
	    "consumer_key": items["consumer_key"],
	    "consumer_secret": items["consumer_secret"],
	    "access_token": items["access_token"],
	    "access_token_secret": items["access_token_secret"],
	    "callBackUrl": "XXX"
	};
	console.log(config);

	var twitter = new Twitter(config);
	return twitter;
}