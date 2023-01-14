import _ from 'lodash';

import BaseDAO from './base.js';

import EmployeeDTO from './models/employee_dto.js';

const EmployeeFields = [
  'emp_no as empNo',
  'birth_date as birthDate',
  'first_name as firstName',
  'last_name as lastName',
  'gender',
  'hire_date as hireDate'
];

function createEmployeeDTO(data) {
  if (!data) return null;

  return new EmployeeDTO(data);
}

class EmployeeDAO extends BaseDAO {
  async getEmployeeById(employeeId, trx) {
    const employee = await trx('employees').first(EmployeeFields)
      .where('emp_no', employeeId);
    
    return createEmployeeDTO(employee);
  }

  async getPaginatedEmployees(continuationId, limit, trx) {
    const employeesQuery = trx('employees').select('emp_no as id');

    if (continuationId) employeesQuery.where('emp_no', '>', continuationId);
    if (limit) employeesQuery.limit(limit);

    const employees = await employeesQuery.orderBy('last_name', 'asc');

    return _.map(employees, e => e.id);
  }
}

export default EmployeeDAO;
