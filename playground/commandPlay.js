const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to get weather for',
            string: true
        }
    })
    .command('*', 'the default command', () => {}, (argv) => {
        '-a=81 4 Riverpark Drive Liverpool NSW'
    })
    .help()
    .alias('help', 'h')
    .argv;