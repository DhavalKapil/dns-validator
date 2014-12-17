var args = require('./lib/args.js');
var CONST = require('./lib/constants.js');

var fs = require('fs');

var daemon = require('daemonize2').setup({
	main: 'app.js',
	name: CONST.NAME,
});

switch (args.params.command) {
	case 'start': 
		daemon.start();
		break;

	case 'stop': 
		daemon.stop();
		break;

	case 'restart': 
		daemon.stop(function(err) {
			daemon.start();
		});
		break;

	case 'status':
		var pid = daemon.status();
		if (pid) {
			console.log(CONST.NAME + ' daemon running. PID: ' + pid);
		}
		else {
			console.log(CONST.NAME + ' daemon not running.');
		}
		break;
		
	default: 
		args.help();
}

process.on('uncaughtException', function(err) {
	fs.appendFile('err', err + '\n');
});