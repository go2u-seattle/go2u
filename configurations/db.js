'use strict';

var mongoDbUserName = 'go2u-server-admin';
var mongoDbPassword = 'go2u!2019';
var dbConfigurations = {
    connectionString: `mongodb+srv://${mongoDbUserName}:${mongoDbPassword}@go2u-server-dev-terol.mongodb.net/test?retryWrites=true`
};

module.exports = dbConfigurations;