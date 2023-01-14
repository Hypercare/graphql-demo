import _ from 'lodash';

import BaseService from './base.js';

class Employee extends BaseService {
  #db = _.pick(this.daoFactory.mysql, ['employeeDAO']);

  async getEmployeeById(employeeId) {
    const employee = await this.request.sessionData.getReadConnection()(cxn =>
      this.#db.employeeDAO.getEmployeeById(employeeId, cxn)
    );

    return employee
  }
}

export default Employee;
