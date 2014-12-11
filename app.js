var dns = require('./lib/dns.js');
var args = require('./lib/args.js');
var logger = require('./lib/logger.js');

logger.config.log = args.params.log;
logger.config.verbose = args.params.verbose;

dns.startCapture(logger.config);