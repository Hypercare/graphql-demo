import knex from 'knex';
import _ from 'lodash';

const DEFAULT_SSL_CONFIG = {
  rejectUnauthorized: false,
  insecureAuth: true
};

function createDBConfig(config, sslConfig = DEFAULT_SSL_CONFIG) {
  const connectionConfig = {
    client: 'mysql',
    debug: true,
    pool: {
      min: 0,
      max: 20
    },
    acquireConnectionTimeout: 100000,
    connection: _.assign({}, config),
    insecureAuth: sslConfig.insecureAuth,
    ssl: {
      rejectUnauthorized: sslConfig.rejectUnauthorized
    }
  };

  return connectionConfig;
}

class MySQLConnector {
  constructor(name, config) {
    this.config = config;
    this.name = name;
    this.connection = null;
  }

  connect(sslConfig, additionalConfig = { debug: true, acquireConnectionTimeout: 10000 }) {
    const connectionConfig = _.assign(createDBConfig(this.config, sslConfig), additionalConfig);

    const logConfig = {
      warn(message) {
        console.warn({ message }, 'DB: warning');
      },
      error(message) {
        console.error({ message }, 'DB: error');
      }
    };

    const newConnection = knex(_.assign(connectionConfig, { log: logConfig }));

    newConnection.on('query-error', (err, obj) => {
      console.error({ err, obj }, 'Error running query');
    });

    this.connection = newConnection;
  }

  transaction(handler) {
    if (_.isNil(this.connection)) return null;
    return this.connection.transaction(handler);
  }

  isInitialized() {
    return !_.isEmpty(connection);
  }
}

export default MySQLConnector;
