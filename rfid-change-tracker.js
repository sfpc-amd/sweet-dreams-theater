var RFID = require('./rfid.js');

var rfid = new RFID();

// rfid.on('poll', function(id) {
// 	console.log('poll event', id);
// });

rfid.on('change', function(id) {
	console.log('change', id);
});


rfid.on('start', function() {
	console.log('start polling');
});

rfid.on('stop', function() {
	console.log('stop polling');
});

rfid.on('error', function(err) {
	throw err;
});

rfid.start();


setInterval(function(){
	// console.log('tick');
}, 1000);
