/**
 * RFID Module
 *
 * Simple hack to poll the `nfc-list` command and grabbed connected RFID data.
 * 
 * Events
 *
 * "poll" - emitted every time the nfc list is polled
 * "start" - emitted when polling starts
 * "stop" - emitted when polling stops
 * "change" - emitted when id is changed
 * "error" - emitted if there is an error during polling
 */



// require modules
var sys = require('sys')
	, exec = require('child_process').exec
	, events = require('events')
	, EventEmitter = events.EventEmitter
	, util = require('util');

// module vars
var re = /UID \([A-z0-9]+\):([a-z0-9 ]+)/
	, defaultDelay = 500
	, polling = false
	, continuePolling = true
  , currentId;


var RFID = function(opts) {
	var opts = opts || {};		
	this.delay = opts.delay || defaultDelay;
	this.debug = (typeof opts.debug == 'undefined') ? false : opts.debug;
	// this.intervalId = null;	

	EventEmitter.call(this);
};

util.inherits(RFID, EventEmitter);

RFID.prototype.start = function() {
	// var self = this;

	if(!polling) {
		// this.intervalId = setInterval(function() { self.nfcList() }, this.delay);
		polling = true;
		continuePolling = true;
		this.emit('start');

		this.nfcPoll();

		if(this.debug) console.log('RFID: poll:start', this.delay);
	}
};

RFID.prototype.stop = function() {
	// if(this.intervalId) {
		// clearTimeout(this.intervalId);
		polling = false;
		continuePolling = false;

		if(this.debug) console.log('RFID: stop');
	// }
};


RFID.prototype.nfcPoll = function() {
	if(this.debug) console.log('RFID: nfcPoll');
	exec('nfc-poll', this._nfcPoll.bind(this));
};

RFID.prototype._nfcPoll = function(error, stdout, stderr) {
	var id = null;

	/*if(error) {
		this.emit('error', error);

		if(this.debug) console.error('RFID: error: ', error);
		return;
	}*/

	// search for id
	if(re.test(stdout)) {
		id = re.exec(stdout)[1].replace(/ /g, '');
		if(id != currentId) {
			this.emit('change', id);
		}
		currentId = id;
	}


	// emit a poll event no matter what
	// (will be `null` if no card is present)
	this.emit('poll', id);

	if(this.debug) console.log('RFID: poll: ', id);

	if(continuePolling) {
		setTimeout(this.nfcPoll.bind(this), 0);
	} else {
		polling = false;
		this.emit('stop');
	}

};


// RFID.prototype.nfcList = function() {
// 	if(this.debug) console.log('RFID: nfcList');
// 	exec('nfc-list', this._nfcList.bind(this));
// };

// RFID.prototype._nfcList = function(error, stdout, stderr) {
// 	var id = null;

// 	if(error) {
// 		this.emit('error', error);

// 		if(this.debug) console.error('RFID: error: ', error);
// 		return;
// 	}

// 	// search for id
// 	if(re.test(stdout)) {
// 		id = re.exec(stdout)[1].replace(/ /g, '');
// 		if(id != currentId) {
// 			this.emit('change', id);
// 		}
// 		currentId = id;
// 	}


// 	// emit a poll event no matter what
// 	// (will be `null` if no card is present)
// 	this.emit('poll', id);

// 	if(this.debug) console.log('RFID: poll: ', id);

// };


module.exports = RFID;
