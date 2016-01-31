var env = process.env.ENV_CONF || 'dev';

var config = {
    pgConnectionStr: '',
    port: 0,
    app: null
};

var envConfig = require('./env/' + env);

for(var i in envConfig) {
    config[i] = envConfig[i];
}

config.env = env;
// if behind proxy:
if(env === 'ubuntu') {
    var globalTunnel = require('global-tunnel');

    globalTunnel.initialize({
        host: '16.42.57.12',
        port: 8080,
        sockets: 50 // optional pool size for each http and https
    });
}


module.exports = config;