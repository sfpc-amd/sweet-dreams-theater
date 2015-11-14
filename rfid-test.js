var sys = require('sys');
var exec = require('child_process').exec;
var events = require('events');
var EventEmitter = new events.EventEmitter;
var util = require('util');

var re = /UID \([A-z0-9]+\):([a-z0-9 ]+)/;
var defaultDelay = 500;


var RFID = function(opts) {
	var opts = opts || {};		
	this.delay = opts.delay || defaultDelay;
	this.intervalId = null;	

	EventEmitter.call(this);
};

util.inherits(RFID, EventEmitter);

RFID.prototype.startPolling = function() {
	this.stopPolling();
	this.intervalId = setTimeout(nfcList, pollDelay);
};

RFID.prototype.stopPolling = function() {
	if(this.intervalId) {
		clearTimeout(this.intervalId);
	}
};

RFID.prototype.nfcList = function() {
	exec('nfc-list', _nfcList);
};

RFID.prototype._nfcList = function(error, stdout, stderr) {
	var id = '';
	if(re.test(stdout)) {
		id = re.exec(stdout)[1].replace(/ /g, '');
		console.log(id);
	}
	this.emit('poll', id);
};


module.exports = RFID;
