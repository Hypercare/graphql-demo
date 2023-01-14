import EmployeeDAO from './employee_dao.js';

export default (modules, request) => {
  const employeeDAO = new EmployeeDAO(modules, request);

  return {
    employeeDAO
  };
}
