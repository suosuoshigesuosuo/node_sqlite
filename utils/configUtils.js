const nconf = require('nconf');

function Config(){
    nconf.argv().env();
    let environment = nconf.get('NODE_ENV') || 'development';
    nconf.file(environment, `./config/${environment}.json`)
    nconf.file('default', './config/default.json');
}

Config.prototype.get = (key) => {
    return nconf.get(key)
}

module.exports = new Config();