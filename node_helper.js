const NodeHelper = require('node_helper');
const BIXIFetcher = require('./helpers/BIXIFetcher');

module.exports = NodeHelper.create({
	start() {
		console.log(`Starting node helper for: ${this.name}`);
	},

	socketNotificationReceived(notification, payload) {
		const stationId = payload.stationId;
		const interval = payload.interval;
		console.log(notification);
		if (notification === 'STATION_STATUS') {
			const bixiFetcher = new BIXIFetcher(stationId, interval);
			bixiFetcher.on(stationId, (stationStatus) => {
				this.sendSocketNotification('BIXI_EVENT', stationStatus);
			});
		}
	},
});
