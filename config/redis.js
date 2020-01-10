var redis = require('redis');
var client = redis.createClient(); // this creates a new client

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

exports.PINCODE_PREFIX = '_pincode';

exports.get = function(key, onResult) {
    client.get(key, function (err, reply) {
		onResult(err, reply);
	});
}

exports.set = function(key, value, onResult) {
    client.set(key, value, function (err, reply) {
		onResult(err, reply);
	});
}