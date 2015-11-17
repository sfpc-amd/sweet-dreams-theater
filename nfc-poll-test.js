var sys = require('sys')
	, exec = require('child_process').exec;

var re = /UID \([A-z0-9]+\):([a-z0-9 ]+)/;


function pollResult(error, stdout, stderr) {
	var id = null;


	console.log(stdout);


	if(error) {
		console.error('RFID: error: ', error);
		return;
	}

	// search for id
	if(re.test(stdout)) {
		id = re.exec(stdout)[1].replace(/ /g, '');
		currentId = id;
	}

	console.log('RFID: poll: ', id);

};

exec('nfc-poll', pollResult);
