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

}

function

function onRfidChange(id) {
  console.log("Change tag: "+ id);

  if(config.playlistMapping[id]) {
    console.log("Set play directory: "+config.mediaDir+config.playlistMapping[id]);    
  }
}
 
function printIntro() {
  console.log(pkg.title+' v'+pkg.version);
}

// read all files in given directory
// fs.readdir(p, function(err, files) {
//   if(err) {
//     throw err;
//   }

//   files.map(function (file) {
//     // get full file path
//     return path.join(p, file);
//   }).filter(function (file) {
//     // filter only playable movie files
//     var re = /\.(mov|avi|mp4)$/i;
//     return fs.statSync(file).isFile() && re.test(file);
//   }).forEach(function (file) {
//     playlist.push(file);
//   });

//   console.log('playlist: ', playlist);

//   omx.play(playlist, {loop: true});

// });


// jenky way of keeping script open
// 
init();
// setInterval(function(){}, 1000);
