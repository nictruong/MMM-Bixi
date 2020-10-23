Module.register('MMM-Bixi', {
	defaults: {
		interval: 10,
		stations: [334],
	},

	start: function () {
		Log.log('Starting MMM-Bixi...');

		for (let stationId of this.stations) {
			this.addStation(stationId);
		}

		this.stationData = {};
	},

	getDom: function () {
		const wrapper = document.createElement('div');

		if (Object.keys(this.stationData).length) {
			for (let stationId in this.stationData) {
				const stationElement = document.createElement('div');
				stationElement.innerHTML = stationId;

				wrapper.appendChild(stationElement);
			}
		} else {
			wrapper.innerHTML = 'hello world';
		}

		return wrapper;
	},

	socketNotificationReceived: (notification, payload) => {
		if (notification === 'BIXI_EVENT') {
			Log.log(payload);
			this.stationData[payload.station_id] = payload;
			this.updateDom();
		}
	},

	addStation: function (stationId) {
		Log.log(`Adding Bixi station id: ${stationId}`);

		this.sendSocketNotification('STATION_STATUS', {
			stationId,
			interval: this.interva,
		});
	},
});
