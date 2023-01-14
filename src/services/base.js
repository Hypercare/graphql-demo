class BaseService {
  constructor(modules, request, daoFactory) {
    this.modules = modules;
    this.request = request;
    this.daoFactory = daoFactory;
  }
}

export default BaseService;
