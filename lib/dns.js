
var pcap = require('pcap');
var _ = require('underscore');

var remoteDns = require('./remoteDns.js');
var logger = require('./logger.js');

var requestsUnanswered = {};
var domainIpMaps = {};

function handleDNSRequestPacket(dns) {
	var id = dns.header.id;
	logger.appendLog('Analyzing DNS request package id: ' + id, 'debug');

	if (requestsUnanswered.hasOwnProperty(id)) {
		requestsUnanswered[id].count++;
	}
	else {
		requestsUnanswered[id] = {
			count: 1,
			question: dns.question
		};
	}
}

// Checks the question section only
function checkQuestionAnswer(dns) {
	var id = dns.header.id;

	var q1 = dns.question;
	var q2 = requestsUnanswered[id].question;

	if (q1.length !== q2.length) {
		return false;
	}

	for (var i = 0;i<q1.length;i++) {
		var flag = 0;
		for (var j = 0;j<q2.length;j++) {
			if (_.isEqual(q1[i], q2[j])) {
				flag = 1;
				break;
			}
		}
		if (flag === 0) {
			return false;
		}
	}

	return true;
}

function decrementCountById(id) {
	if (requestsUnanswered[id].count === 1) {
		delete requestsUnanswered[id];
	}
	else {
		requestsUnanswered[id].count--;
	}
}

function getIpArray(dns) {
	var IPArray = [];

	for (var i = 0;i<dns.header.ancount;i++) {
		var answer = dns.answer[i];

		if (answer.rrtype === 'A') {
			IPArray.push(answer.data.ipAddress);
		}
	}

	return IPArray;
}

function checkArray(arr1, arr2) {
	if (arr1.length !== arr2.length) {
		return false;
	}

	for (var i = 0;i<arr1.length;i++) {
		var flag = 0;
		for (var j = 0;j<arr2.length;j++) {
			if (arr1[i] === arr2[j]) {
				flag = 1;
				break;
			}
		}
		if (flag === 0) {
			return false;
		}
	}

	return true;
}

function validateDNSResponse(dns) {
	var id = dns.header.id;
	var domain = dns.question[0].qname;

	decrementCountById(id);

	var ipFromDns = getIpArray(dns);

	if (ipFromDns.length === 0) {
		// No Ip's returned. Not flagging as error.
		logger.appendLog('Ignoring resonse packet(id=' + id + ') with no answers', 'debug');
		return;
	}

	if (domainIpMaps.hasOwnProperty(domain)) {
		logger.appendLog('Found ' + domain + ' for id=' + id  + ' in cache', 'debug');

		if (checkArray(domainIpMaps[domain], ipFromDns)) {
			logger.appendLog('Records matched for ' + domain, 'debug');
			return;
		}
	}

	remoteDns.makeRequest(domain, function(ipArr) {
		domainIpMaps[domain] = ipArr;
		logger.appendLog('Records retreived and cached for ' + domain, 'debug');

		if (checkArray(domainIpMaps[domain], ipFromDns)) {
			logger.appendLog('Records matched for ' + domain, 'debug');
			return;
		}

		logger.appendLog('IP\'s return do not match for ' + domain + ' !!!');
	});
}

function handleDNSResponsePacket(dns) {
	var id = dns.header.id;
	logger.appendLog('Analysing DNS response packet id: ' + id, 'debug');

	if (!requestsUnanswered.hasOwnProperty(id)) {
		// Response without a request!!
		logger.appendLog('Response packet (id=' + id + ') generated without a request!!');
		return;
	}

	if (!checkQuestionAnswer(dns)) {
		// Response with different question
		logger.appendLog('Request and response question do not match for id: ' + id);
		return;
	}
	validateDNSResponse(dns);
}

function handleDNSPacket(dns) {
	if (dns.header.qr === 0) {
		// packet is a request
		handleDNSRequestPacket(dns);
	}
	else {
		// packet is a response
		handleDNSResponsePacket(dns);
	}
}

function startCapture(loggerConfig) {
	logger.config = loggerConfig;

	var pcapSession = pcap.createSession('any', 'ip proto \\udp');

	pcapSession.on('packet', function(rawPacket) {
		var packet = pcap.decode.packet(rawPacket);

		// Checking if packet is dns
		if (!packet.link.ip.udp.hasOwnProperty('dns')) {
			return;
		}

		handleDNSPacket(packet.link.ip.udp.dns);
	});
}

exports.startCapture = startCapture;