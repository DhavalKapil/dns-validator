
var fs = require('fs');

var config = {
	log: false,
	verbose: false
};

function appendLog(log, type) {
	if (config.log !== false) {
		if (config.verbose === true || type !== 'debug') {
			fs.appendFile(config.log, log + '\n');
		}
	}
}

exports.appendLog = appendLog;
exports.config = config;