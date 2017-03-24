// 1b59d41a1dfaccfc563e86ac05c4b992
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const { getWeather } = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to get weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


var uriAddress = argv.address;
// var promise = function(address) {
//     return new Promise(function(resolve, reject) {
//         geocode..geocodeAddress(address, (errorMessage, results) => {
//             if (errorMessage) {
//                 reject(errorMessage);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// }

geocode.geocodeAddress(uriAddress)
    .then(results => getWeather(results.latitude, results.longitude))
    .then(result => console.log(result))
    .catch(err => console.log(err));


// console.log(argv);
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(results.address);
//         weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
//             if (errorMessage) {
//                 console.log(errorMessage)
//             } else {
//                 console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
//             }
//         });
//     }
// });