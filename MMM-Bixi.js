Module.register('MMM-Bixi', {
	defaults: {
		interval: 10,
		stations: [334],
	},

	start: () => {
		Log.log('Starting MMM-Bixi...');

		// for (let stationId of this.stations) {
		// 	this.addStation(stationId);
		// }
	},

	getDom: () => {
		const wrapper = document.createElement('div');
		wrapper.innerHTML = 'hello world';

		return wrapper;
	},

	// socketNotificationReceived: (notification, payload) => {
	// 	if (notification === 'BIXI_EVENT') {
	// 		Log(payload);
	// 	}
	// },

	// addStation: (stationId) => {
	// 	Log(`Adding Bixi station id: ${stationId}`);

	// 	this.sendSocketNotification('STATION_STATUS', {
	// 		stationId,
	// 		interval: this.interva,
	// 	});
	// },
});
