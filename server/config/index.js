var env = process.env.ENV_CONF || 'dev';
var program = require('commander');

var config = {
    pgConnectionStr: '',
    port: 0,
    app: null,
    proxy: false
};

program
    .version('0.0.1')
    .usage('[options] <file ...>')
    .option('-e, --env [type]', 'Environment config')
    .option('-p, --proxy', 'Over proxy')
    .option('-po, --port [type]', 'Port')
    .parse(process.argv);


if (!program.env) program.env = 'dev';
config.env = program.env;

// get env defaults
var envConfig = require('./env/' + program.env);
for(var i in envConfig) {
    config[i] = envConfig[i];
}

if (program.proxy) config.proxy = true;

if (program.port) config.port = parseInt(program.port);

console.log(config);


// if behind proxy:
if(config.proxy) {
    var globalTunnel = require('global-tunnel');

    globalTunnel.initialize({
        host: '16.42.57.12',
        port: 8080,
        sockets: 50 // optional pool size for each http and https
    });
}


module.exports = config;