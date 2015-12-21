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

module.exports = config;