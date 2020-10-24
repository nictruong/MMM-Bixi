const NodeHelper = require("node_helper");
const BIXIFetcher = require("./helpers/BIXIFetcher");

module.exports = NodeHelper.create({
  start() {
    console.log(`Starting node helper for: ${this.name}`);
  },

  socketNotificationReceived(notification, payload) {
    const interval = payload.interval;
    console.log(notification);
    if (notification === "STATION_STATUS") {
      const bixiFetcher = new BIXIFetcher(interval);
      bixiFetcher.start();
      bixiFetcher.on("BIXI", (stationStatuses) => {
        this.sendSocketNotification("BIXI_EVENT", stationStatuses);
      });
    }
  }
});
