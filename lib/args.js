
var argv = require('argv');

var CONST = require('./constants.js');

argv.version(CONST.VERSION);

argv.info(CONST.DESCRIPTION);

for (var i = 0;i<CONST.MODULES.length;i++) {
	argv.mod(CONST.MODULES[i]);
}

var arguments = argv.run();

var params = {};
params.log = typeof arguments.options.log === 'undefined' ?
	false : arguments.options.log
params.verbose = typeof arguments.options.verbose !== 'undefined';
params.command = arguments.mod;

exports.params = params;