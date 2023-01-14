import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import DAOFactory from '../../data/index.js';
import ServiceFactory from '../../services/index.js';

export default (modules) => {

  async function load(req, res, next) {
    const request = {};

    request.requestId = uuidv4();
    
    const dbConnections = loadDBConnections();
    _.assign(request, dbConnections);

    const services = loadServices(req);
    _.assign(request, { services });

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

  function loadDAO(request) {
    const daoFactory = DAOFactory(modules, request);
    return daoFactory;
  }

  function loadServices(request) {
    const daoFactory = loadDAO(request);
    const serviceFactory = ServiceFactory(modules, request, daoFactory);

    return serviceFactory;
  }

  return { load };
}
