/**
 * RFID Module
 *
 * Simple hack to poll the `nfc-list` command and grabbed connected RFID data.
 * 
 * Events
 *
 * "poll" - emitted every time the nfc list is polled
 * "poll:start" - emitted when polling starts
 * "poll:stop" - emitted when polling stops
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
	, currentId;


var RFID = function(opts) {
	var opts = opts || {};		
	this.delay = opts.delay || defaultDelay;
	this.debug = (typeof opts.debug == 'undefined') ? false : opts.debug;
	this.intervalId = null;	

	EventEmitter.call(this);
};

util.inherits(RFID, EventEmitter);

RFID.prototype.start = function() {
	var self = this;

	if(!polling) {
		this.intervalId = setInterval(function() { self.nfcList() }, this.delay);
		polling = true;
		this.emit('poll:start');

		if(this.debug) console.log('RFID: poll:start', this.delay);
	}
};

RFID.prototype.stop = function() {
	if(this.intervalId) {
		clearTimeout(this.intervalId);
		polling = false;
		this.emit('poll:stop');

		if(this.debug) console.log('RFID: poll:stop');
	}
};

RFID.prototype.nfcList = function() {
	if(this.debug) console.log('RFID: nfcList');
	exec('nfc-list', this._nfcList.bind(this));
};

RFID.prototype._nfcList = function(error, stdout, stderr) {
	var id = null;

	if(error) {
		this.emit('error', error);

		if(this.debug) console.error('RFID: error: ', error);
		return;
	}

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

};


module.exports = RFID;
