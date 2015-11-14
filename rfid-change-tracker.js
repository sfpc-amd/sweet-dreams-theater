var rfid = require('./rfid-test.js');

rfid.on('poll', function(id) {
	console.log('poll event', id);
});
rfid.start();
