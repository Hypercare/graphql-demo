import MySQLFactory from './mysql/index.js';

export default (modules, request) => {
  const mysql = MySQLFactory(modules, request);

  return {
    mysql
  };
}
