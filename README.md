# MMM-Bixi

MMM-Bixi is a Magic Mirror module for displaying bicycle and electric bicycle availabilities of any station in the Bixi network in Montreal. Simply add a station's id and an optional display name for each station you want to monitor. It gets data from the [Bixi open data page](https://www.bixi.com/en/page-27).

![example](/screenshot.png)

## Installation

Remote to your raspberry pi and navigate to your Magic Mirror modules folder

```bash
cd ~/MagicMirror/modules
```

Clone the MMM-Bixi repository

```bash
git clone https://github.com/nictruong/MMM-Bixi.git
```

Go to the MMM-Bixi module and install dependencies

```bash
cd MMM-Bixi
npm install
```

Add the following configs to the Magic Mirror configs file

```
...
{
    module: "MMM-Bixi",
    config: {
        interval: 60,
        stations: [
            { id: 334, displayName: "Jarry / Gounod" }, 
            { id: 67, displayName: "University / Milton" }
        ],
        showBikes: true,
        showEBikes: true,
        showTotal: false,
    },
    position: 'top_left'
}
...
```

## Configuration

MMM-Bixi is configurable by simply changing the MMM-Bixi entry in the Magic Mirror configs file.

The *interval* controls the interval in seconds between refreshes.

Station *ids* can be find [here](https://api-core.bixi.com/gbfs/en/station_information.json). *Display name* is optional.
