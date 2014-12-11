
var packageJson = require('../package.json');

// Exporting version
exports.VERSION = packageJson.version;

// Exporting application name
exports.NAME = packageJson.name;

// Exporting description
exports.DESCRIPTION = packageJson.description;

exports.MODULES = [
	{
		mod: 'start',
		description: 'start ' + exports.NAME + ' as a daemon process',
		options: [
			{
				name: 'log',
				short: 'l',
				type: 'string',
				description: 'generate logs in external file',
				example: exports.NAME + ' start -l log_file or --log=log_file'
			},
			{
				name: 'verbose',
				short: 'v',
				type: 'string',
				description: 'verbose detailed steps in log file',
				example: exports.NAME + ' start -l log_file --verbose|-v'
			}
		]
	},
	{
		mod: 'stop',
		description: 'stop ' + exports.NAME,
		options: []
	}
];