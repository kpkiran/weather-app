const yargs = require('yargs');
const axios = require('axios');
var config = require('./config');

const argv = yargs
    .options({
        a: {
            //demand: flase,
            alias: 'address',
            describe: 'Address to get weather for',
            string: true
        },
        c: {
            alias: 'celcius',
            describe: 'Temperature in celcius',
            string: true
        },
        f: {
            alias: 'fahrenheit',
            describe: 'Temperature in fahrenheit',
            string: true
        }
    })
    // .command('*', 'the default command', () => {}, (argv) => {
    //     argv.address = argv.address || config.address;
    // })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.address) {
    var encodedAddress = encodeURIComponent(argv.address);
} else {
    var encodedAddress = encodeURIComponent(config.address);
}

console.log('Encoded address is ', encodedAddress);
geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geoCodeURL).then((res) => {
    if (res.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    var lat = res.data.results[0].geometry.location.lat;
    var lng = res.data.results[0].geometry.location.lng;

    console.log(lat + ' ' + lng);

    var weatherURL = `https://api.darksky.net/forecast/1b59d41a1dfaccfc563e86ac05c4b992/${lat},${lng}`;
    console.log(res.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((res) => {
    var temperature = res.data.currently.temperature;
    var apparentTemperature = res.data.currently.apparentTemperature;

    var fahrenheitTemperature = temperature / (5 / 9) + 32;
    var apparentFahrenheitTemperature = apparentTemperature / (5 / 9) + 32;

    if (argv._.includes('c')) {
        console.log(`It is currently ${temperature} but it seems as ${apparentTemperature}`);
    }

    if (argv._.includes('f')) {
        console.log(`It is currently ${fahrenheitTemperature} in fahrenheit but it seems as ${apparentFahrenheitTemperature} in fahrenheit`);
    }

}).catch((err) => {
    if (err.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(err.message);
    }
});