// require libs
var path = require('path')
  , fs = require('fs')
  , omx = require('omxdirector').enableNativeLoop()
  , RFID = require('./rfid.js');

// config files
var pkg = require('./package.json')
  , config = require('./config.json');

var rfid;


function init() {
  printIntro();

  rfid = new RFID();
  rfid.on('change', onTagChange);
  rfid.start();

  omx.on('load', onOmxLoad);

}


function onRfidChange(id) {
  console.log("Change tag: "+ id);

  // if(config.playlistMapping[id]) {
  //   playDirectory(path.join(config.mediaDir, config.playlistMapping[id]));    
  // } else {
  //   console.error('Id not found!', id);
  // }
}

function onOmxLoad(files, options) {
  console.log('video successfull loaded', files, options);
}

function playDirectory(mediaPath) {
  omx.setVideoDir(mediaPath);

  // get list of files
  fs.readdir(mediaPath, function(err, files) {

    console.log('play files', files);

    omx.play(files, {loop: true});

  });

}

 
function printIntro() {
  console.log(pkg.title+' v'+pkg.version);
}

// read all files in given directory



// jenky way of keeping script open
// 
init();
// setInterval(function(){}, 1000);
