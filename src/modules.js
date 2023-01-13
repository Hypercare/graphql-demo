import _ from 'lodash';

import MySQLConnector from './utils/mysql_connector.js';

export default async () => {
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    timezone: process.env.TZ,
    charset: process.env.DB_CHARSET
  };
  
  const rw = new MySQLConnector('Write', dbConfig);
  const ro = new MySQLConnector('Write', dbConfig);

  const connectionConfig = {
    pool: {
      min: 0,
      max: 20
    }
  };

  rw.connect(undefined, connectionConfig);
  ro.connect(undefined, connectionConfig);

  function transactionWrapper(handler) {
    return this.transaction(handler);
  }

  return {
    useReadConnection: _.bind(transactionWrapper, ro),
    useWriteConnection: _.bind(transactionWrapper, rw)
  };
}
