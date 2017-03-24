const yargs = require('yargs');
const axios = require('axios');
//const args = require('yargs-default-command')(yargs);

//const argv = yargs
//args
const argv = yargs
    .options({
        a: {
            //demand: flase,
            alias: 'address',
            describe: 'Address to get weather for',
            string: true
        }
    })
    .command('*', 'the default command', () => {}, (argv) => {
        argv.address = argv.address || '81 4 riverpark drive liverpool nsw';
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
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
    console.log(`It is currently ${temperature} but it seems as ${apparentTemperature}`)
}).catch((err) => {
    if (err.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(err.message);
    }
});