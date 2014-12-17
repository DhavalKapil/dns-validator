# dns-validator

> Security tool to detect dns poisoning attacks

## Features:

 - Watches the transfer of all DNS packets
 - Matches the request with their responses
 - Notifies in case their `question` header does not matche
 - Notifies if any stray packet arrives without a request
 - Gets the IP list for domains through an external service
 - Notifies if they don't match the ones in response packets
 - In built cache for speed improvements
 - Runs as daemon process without interfering with normal traffic
 - Log's to any external file

## Requirements
- **Mac OS X**: >= 10.8 or Growl if earlier.
- **Linux**: notify-osd installed (Ubuntu should have this by default)
- **Windows**: >= 8, task bar balloon if earlier or Growl if that is installed.
- **General Fallback**: Growl

## Installation

```
[sudo] npm install dns-validator
```

## Dependencies

- libpcap-dev: library for network traffic capture
- [mranney/node_pcap](https://github.com/mranney/node_pcap)
- [codenothing/argv](https://github.com/codenothing/argv)
- [request/request](https://github.com/request/request)
- [jashkenas/underscore](https://github.com/jashkenas/underscore)
- [cheeriojs/cheerio](https://github.com/cheeriojs/cheerio)
- [niegowski/node-daemonize2](https://github.com/niegowski/node-daemonize2)
- [mikaelbr/node-notifier](https://github.com/mikaelbr/node-notifier)

## Issue

Major websites use a Content Delivery Network (CDN) to host all their static resources. So the IP's that are retreived through some external source may not match the IP's meant for the region dns-validator is being used. Hence these will be notified to the user even if the dns is not really poisoned. Currently I am having a list of cdn websites in `cdn.js` and not matching their IP's. The list is incomplete for now. If you find any solution to this issue feel free to send a pull request!

## Developer
[Dhaval Kapil](https://dhavalkapil.com/)