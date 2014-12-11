
var argv = require('argv');

var CONST = require('./constants.js');

argv.version(CONST.VERSION);

argv.info(CONST.DESCRIPTION);

for (var i = 0;i<CONST.MODULES.length;i++) {
	argv.mod(CONST.MODULES[i]);
}

var arguments = argv.run();

var params = {};
params.log = arguments.options.log | false;
params.verbose = arguments.options.verbose | false;
params.command = arguments.mod;

exports.params = params;