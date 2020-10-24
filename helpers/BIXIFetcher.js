const fetch = require("node-fetch");
const EventEmitter = require("events");

class BIXIFetcher extends EventEmitter {
  constructor(interval) {
    super();
    this.interval = interval;
  }

  start() {
    this.poll();
    setInterval(this.poll.bind(this), 5000);
  }

  async poll() {
    const stationStatuses = await this.getStationStatuses();
    this.emit("BIXI", stationStatuses);
  }

  async getStationStatuses() {
    try {
      const url = "https://api-core.bixi.com/gbfs/en/station_status.json";
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      return await res.json();
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = BIXIFetcher;
