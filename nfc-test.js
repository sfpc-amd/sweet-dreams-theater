var pcsc = require('pcsclite')();

pcsc.on('reader', function(reader) {
  console.log('New reader detected: '+reader.name);

  reader.on('error', function(err) {
		console.error(err.message);
  });

	reader.on('status', function(status) {
		console.log('status', arguments);
		
	});

	reader.on('end', function() {
		console.log('Reader removed');
		reader.close();
		pcsc.close();
	});

});

