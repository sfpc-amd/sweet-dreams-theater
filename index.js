var path = require('path');
var fs = require('fs');
var omx = require('omxdirector').enableNativeLoop();;

var p = '/media/sfpc-media/share/';
var playlist = [];

// read all files in given directory
fs.readdir(p, function(err, files) {
  if(err) {
    throw err;
  }

  files.map(function (file) {
    // get full file path
    return path.join(p, file);
  }).filter(function (file) {
    // filter only playable movie files
    var re = /\.(mov|avi|mp4)$/i;
    return fs.statSync(file).isFile() && re.test(file);
  }).forEach(function (file) {
    playlist.push(file);
  });

  console.log('playlist: ', playlist);

  omx.play(playlist, {loop: true});

});
