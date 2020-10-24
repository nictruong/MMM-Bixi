# MMM-Bixi

MMM-Bixi is a Magic Mirror module for displaying bicycle and electric bicycle availabilities of any station in the Bixi network in Montreal. Simply add a station's id and an optional display name for each station you want to monitor. It gets data from the [Bixi open data page](https://www.bixi.com/en/page-27)

## Installation

Remote to your raspberry pi and navigate to your Magic Mirror modules folder

```
cd ~/MagicMirror/modules
```

Clone the MMM-Bixi repository

```
git clone https://github.com/nictruong/MMM-Bixi.git
```

Go to the MMM-Bixi module and install dependencies

```
cd MMM-Bixi
npm install
```

Add the following configs to the Magic Mirror configs file

```
...
{
			module: "MMM-Bixi",
			config: {
				interval: 20,
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
