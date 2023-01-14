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
}

export default EmployeeDAO;
