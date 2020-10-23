const fetch = require('node-fetch');
const EventEmitter = require('events');

class BIXIFetcher extends EventEmitter {
	constructor(stationId) {
		this.stationId = stationId;
		this.interval = interval;
	}

	start() {
		setInterval(async function () {
			const stationStatus = await getStationStatus(this.stationId);
			this.emit(this.stationId, stationStatus);
		}, 60 * this.interval);
	}

	async getStationStatus(stationId) {
		const stationStatuses = await this.getStationStatuses();
		return stationStatuses.data.stations.find(
			(station) => station.station_id === stationId
		);
	}

	async getStationStatuses() {
		const url = 'https://api-core.bixi.com/gbfs/en/station_status.json';
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return await res.json();
	}
}

module.exports = BIXIFetcher;
