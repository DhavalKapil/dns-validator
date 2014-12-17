
var packageJson = require('../package.json');
var cdnJson = require('./cdn.json');

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
				description: 'generate logs in external file (absolute path)',
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
	},
	{
		mod: 'restart',
		description: 'restart ' + exports.NAME,
		options: []
	},
	{
		mod: 'status',
		description: 'Get the status of ' + exports.NAME,
		options: []
	}
];

// Exporting help docs
function generateHelpDoc() {
	var helpDoc = exports.DESCRIPTION + '\n\nUSAGE:\n\n';
	helpDoc += '\tsudo ' + exports.NAME + ' [action] [options]\n\n';
	helpDoc += 'actions:\n\n';

	for (var key in exports.MODULES) {
		var module = exports.MODULES[key];
		helpDoc += '\t' + module.mod + '\t\t' + module.description + '\n\n';

		if (module.options.length !== 0) {
			helpDoc += '\t\toptions:\n';
		}

		for (var key2 in module.options) {
			var option = module.options[key2];
			helpDoc += '\t\t\t--' + option.name + ', -' + option.short + '\n';
			helpDoc += '\t\t\t\t' + option.description + '\n';
			helpDoc += '\t\t\t\t' + option.example + '\n\n';
		}

		helpDoc += '\n';
	}
	
	helpDoc += 'global options:';

	return helpDoc;
}

exports.HELP_DOC = generateHelpDoc();

exports.CDN_LIST = cdnJson;