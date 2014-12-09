
var request = require('request');
var cheerio = require('cheerio');

function getIpArray(body) {
	var $ = cheerio.load(body);

	var ipArray = [];

	$('#resultTable > tr').each( function(i, elem) {
		if (i === 0 || i === 1) {
			return;
		}

		// 4th and 5th column of the row's data inside <td>
		var type = this.children[3].children[0].data;
		var ip = this.children[4].children[0].data;

		if (type === 'A') {
			ipArray.push(ip);
		}
	});

	return ipArray;
}

function makeRequest(ip, callback) {
	var params = {
		ip: ip,
		query: 'A'
	};

	request.post( 'http://www.all-nettools.com/toolbox/nslookup.php', {
		form: params
	}, function(err, httpResponse, body) {
		if (err) {
			// Site is unreachable
			return null;
		}

		var ipArray = getIpArray(body);

		callback(ipArray);	
	});
}

exports.makeRequest = makeRequest;