Module.register("MMM-Bixi", {
  defaults: {
    interval: 60, // seconds
    stations: [{ id: 334, displayName: "Jarry/Gounod" }]
  },

  start: function () {
    console.log(this.config);
    Log.log("Starting MMM-Bixi...");

    for (let station of this.config.stations) {
      this.addStation(station.id);
    }

    this.stationData = {};
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

    const headerBikesCol = document.createElement("th");
    headerBikesCol.setAttribute("align", "right");
    headerBikesCol.className = "column";
    const headerBikesIcon = document.createElement("i");
    headerBikesIcon.className = "fas fa-bicycle";
    headerBikesCol.appendChild(headerBikesIcon);

    const headerEBikesCol = document.createElement("th");
    headerEBikesCol.setAttribute("align", "right");
    headerEBikesCol.className = "column";
    const headerEBikesIcon = document.createElement("i");
    headerEBikesIcon.className = "fas fa-bolt";
    headerEBikesCol.appendChild(headerEBikesIcon);

    headerRow.appendChild(headerStationCol);
    headerRow.appendChild(headerBikesCol);
    headerRow.appendChild(headerEBikesCol);

    wrapper.appendChild(headerRow);

    if (Object.keys(this.stationData).length) {
      for (let station of this.config.stations) {
        const stationRow = document.createElement("tr");
        const stationCol = document.createElement("td");
        stationCol.innerHTML = station.displayName
          ? station.displayName
          : station.id;

        const bikesCol = document.createElement("td");
        bikesCol.setAttribute("align", "right");
        bikesCol.innerHTML = this.stationData[station.id][
          "num_bikes_available"
        ];

        const eBikesCol = document.createElement("td");
        eBikesCol.setAttribute("align", "right");
        eBikesCol.innerHTML = this.stationData[station.id][
          "num_ebikes_available"
        ];

        stationRow.appendChild(stationCol);
        stationRow.appendChild(bikesCol);
        stationRow.appendChild(eBikesCol);

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
      this.stationData[payload.station_id] = payload;
      this.updateDom();
    }
  },

  addStation: function (stationId) {
    Log.log(`Adding Bixi station id: ${stationId}`);

    this.sendSocketNotification("STATION_STATUS", {
      stationId,
      interval: this.config.interval
    });
  }
});
