Module.register("MMM-Bixi", {
  defaults: {
    interval: 60, // seconds

    stations: [{ id: 334, displayName: "Jarry / Gounod" }],

    showBikes: true,
    showEBikes: true,

    bikeIcon: "bicycle",
    eBikeIcon: "bolt"
  },

  start: function () {
    Log.log("Starting MMM-Bixi...");

    this.stationData = {};
    this.pollData();
  },

  getStyles: function () {
    return ["MMM-Bixi.css", "font-awesome.css"];
  },

  getScripts: function () {
    return ["moment.js"];
  },

  getDom: function () {
    const wrapper = document.createElement("table");
    wrapper.className = "MMM-Bixi";
    const headerRow = document.createElement("tr");

    const headerStationCol = document.createElement("th");
    const headerBikesCol = this.createHeaderColumn(this.config.bikeIcon);
    const headerEBikesCol = this.createHeaderColumn(this.config.eBikeIcon);

    headerRow.appendChild(headerStationCol);
    if (this.config.showBikes) {
      headerRow.appendChild(headerBikesCol);
    }

    if (this.config.showEBikes) {
      headerRow.appendChild(headerEBikesCol);
    }

    wrapper.appendChild(headerRow);

    if (Object.keys(this.stationData).length) {
      for (let station of this.config.stations) {
        const stationRow = document.createElement("tr");

        const stationCol = document.createElement("td");
        stationCol.innerHTML = station.displayName
          ? station.displayName
          : station.id;

        const bikesCol = this.createBodyColumn(
          station.id,
          "num_bikes_available"
        );

        const eBikesCol = this.createBodyColumn(
          station.id,
          "num_ebikes_available"
        );

        stationRow.appendChild(stationCol);
        if (this.config.showBikes) {
          stationRow.appendChild(bikesCol);
        }

        if (this.config.showEBikes) {
          stationRow.appendChild(eBikesCol);
        }

        wrapper.appendChild(stationRow);
      }
    } else {
      wrapper.innerHTML = "Loading...";
    }

    return wrapper;
  },

  socketNotificationReceived: function (notification, payload) {
    Log.log(notification);
    if (notification === "BIXI_EVENT") {
      this.parseBixiData(payload.data.stations);

      this.updateDom();
    }
  },

  pollData: function () {
    this.sendSocketNotification("STATION_STATUS", {
      interval: this.config.interval
    });
  },

  parseBixiData: function (bixiData) {
    for (let station of this.config.stations) {
      const data = bixiData.find((s) => s.station_id == station.id);
      this.stationData[station.id] = data;
    }
  },

  createHeaderColumn: function (icon) {
    const headerCol = document.createElement("th");
    headerCol.setAttribute("align", "right");
    headerCol.className = "column";
    const headerIcon = document.createElement("i");
    headerIcon.className = `fas fa-${icon}`;
    headerCol.appendChild(headerIcon);

    return headerCol;
  },

  createBodyColumn: function (id, type) {
    const bikesCol = document.createElement("td");
    bikesCol.setAttribute("align", "right");
    bikesCol.innerHTML = this.stationData[id][type];

    return bikesCol;
  }
});
