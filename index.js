
if(process.argv.length > 2 && process.argv[2] === '-d') {
	console.log('starting daemon');
	require('daemon')();
	var _daemon = true;	
}

// require libs
var path = require('path')
  , fs = require('fs')
  , omx = require('omxdirector').enableNativeLoop()
  , RFID = require('./rfid.js');

// config files
var pkg = require('./package.json')
  , config = require('./config.json');

var rfid;

// write pid file
if(_daemon) {
	fs.writeFile(path.join(process.cwd(), 'pid'), process.pid);
}


function init() {
  printIntro();

  rfid = new RFID({ debug: true });
  rfid.on('change', onRfidChange);
  rfid.on('start', onRfidStart);
	rfid.start();

  omx.on('load', onOmxLoad);

}

function onRfidStart() {
	console.log('rfid start');
}

function onRfidChange(id) {
  console.log("Change tag: "+ id);

  if(config.playlistMapping[id]) {
  	playDirectory(path.join(config.mediaDir, config.playlistMapping[id]));    
  } else {
  	console.error('Id not found!', id);
  }
}

function onOmxLoad(files, options) {
  console.log('video successfull loaded', files, options);
}

function playDirectory(mediaPath) {
  omx.stop();
	omx.setVideoDir(mediaPath);

  // get list of files
  fs.readdir(mediaPath, function(err, files) {

    console.log('play files', files);

    omx.play(files);

  });

}

 
function printIntro() {
  console.log(pkg.title+' v'+pkg.version);
}

init();
