import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default (modules) => {

  async function load(req, res, next) {
    const request = {};

    request.requestId = uuidv4();
    
    const dbConnections = loadDBConnections();
    _.assign(request, dbConnections);

    req.sessionData = request;

    next();
  }

  function loadDBConnections() {
    const request = {};

    let writeConnectionUsed = false;
    request.getReadConnection = () => {
      if (writeConnectionUsed) return modules.useWriteConnection;
      return modules.useReadConnection;
    }

    request.getWriteConnection = () => modules.useWriteConnection;

    return request;
  }

  return { load };
}
