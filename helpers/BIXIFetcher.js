const fetch = require("node-fetch");
const EventEmitter = require("events");

class BIXIFetcher extends EventEmitter {
  constructor(stationId, interval) {
    super();
    this.stationId = stationId;
    this.interval = interval;
  }

  start() {
    this.poll();
    setInterval(this.poll.bind(this), 5000);
  }

  async poll() {
    console.log(this.stationId);
    const stationStatus = await this.getStationStatus(this.stationId);
    console.log(stationStatus);
    this.emit(this.stationId, stationStatus);
  }

  async getStationStatus(stationId) {
    const stationStatuses = await this.getStationStatuses();
    return stationStatuses.data.stations.find(
      (station) => station.station_id == stationId
    );
  }

  async getStationStatuses() {
    const url = "https://api-core.bixi.com/gbfs/en/station_status.json";
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    return await res.json();
  }
}

module.exports = BIXIFetcher;
