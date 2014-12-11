
var fs = require('fs');
var notifier = require('node-notifier');

var config = {
	log: false,
	verbose: false
};

function log(str, type) {
	if (config.log !== false) {
		if (config.verbose === true || type !== 'debug') {
			fs.appendFile(config.log, str + '\n');
		}
		if (type !== 'debug') {
			notifier.notify({
				title: 'Notification',
				message: str
			});
		}
	}
}

exports.log = log;
exports.config = config;