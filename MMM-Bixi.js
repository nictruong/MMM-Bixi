Module.register('MMM-Bixi', {
	defaults: {
		interval: 10,
		stations: [334],
	},

	start: function () {
		Log.log('Starting MMM-Bixi...');
		console.log('hello world');

		// for (let stationId of this.stations) {
		// 	this.addStation(stationId);
		// }
	},

	getDom: function () {
		const wrapper = document.createElement('div');
		wrapper.innerHTML = 'hello world';

		return wrapper;
	},

	// socketNotificationReceived: (notification, payload) => {
	// 	if (notification === 'BIXI_EVENT') {
	// 		Log(payload);
	// 	}
	// },

	addStation: function (stationId) {
		Log.log(`Adding Bixi station id: ${stationId}`);

		this.sendSocketNotification('STATION_STATUS', {
			stationId,
			interval: this.interva,
		});
	},
});
