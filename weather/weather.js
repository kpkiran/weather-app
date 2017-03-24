const request = require('request');

var getWeather = function(latitude, longitude) {
    return new Promise((resolve, reject) => {
        console.log(latitude, longitude)
        request({
            url: `https://api.darksky.net/forecast/1b59d41a1dfaccfc563e86ac05c4b992/${latitude},${longitude}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to forcast.io servers...');
            } else if (response.statusCode === 404) {
                reject('Unable to fetch weather');
            } else if (response.statusCode === 200) {
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }
        });
    })
}

module.exports.getWeather = getWeather;