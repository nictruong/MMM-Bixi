const NodeHelper = require('node_helper');
const BIXIFetcher = require('./helpers/BIXIFetcher');

module.exports = NodeHelper.create({
	start() {
		Log.log(`Starting node helper for: ${this.name}`);
	},

	socketNotificationsReceived(notification, payload) {
		const stationId = payload.stationId;
		const interval = payload.interval;
		if (notification === 'STATION_STATUS') {
			const bixiFetcher = new BIXIFetcher(stationId, interval);
			bixiFetcher.on(stationId, (stationStatus) => {
				this.sendSocketNotification('BIXI_EVENT', stationStatus);
			});
		}
	},
});
