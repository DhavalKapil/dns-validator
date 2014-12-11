
var fs = require('fs');
var notifier = require('node-notifier');

var config = {
	log: false,
	verbose: false
};

// The time to till which the notification will not display again
var TIME_LIMIT = 1000*60*60;
var notificationCache = {};

function log(str, type) {
	if (config.log !== false) {
		if (config.verbose === true || type !== 'debug') {
			fs.appendFile(config.log, str + '\n');
		}
	}

	if (type !== 'debug') {
		var time = new Date().getTime();
		if(notificationCache.hasOwnProperty(str)) {
			if( (notificationCache[str]+TIME_LIMIT) >= time) {
				// Don't display notification
				return;
			}
		}

		notifier.notify({
			title: 'Notification',
			message: str
		});

		notificationCache[str] = time;
	}
}

exports.log = log;
exports.config = config;