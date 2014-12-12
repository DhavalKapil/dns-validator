
var argv = require('argv');

var CONST = require('./constants.js');

argv.version(CONST.VERSION);

argv.info(CONST.DESCRIPTION);

for (var i = 0;i<CONST.MODULES.length;i++) {
	argv.mod(CONST.MODULES[i]);
}

var args = argv.run();

var params = {};
params.log = typeof args.options.log === 'undefined' ?
	false : args.options.log;
params.verbose = typeof args.options.verbose !== 'undefined';
params.command = args.mod;

exports.params = params;