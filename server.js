const request = require('request');

request({
    url: 'https://api.darksky.net/forecast/1b59d41a1dfaccfc563e86ac05c4b992/37.8267122.4233',
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to forcast.io servers...');
    } else if (response.statusCode === 404) {
        console.log('Unable to fetch weather');
    } else if (response.statusCode === 200) {
        console.log(`Temperature: ${body.currently.temperature}`);
    }
});