import EmployeeService from './employee.js';

export default (modules, request, daoFactory) => {
  const employee = new EmployeeService(modules, request, daoFactory);

  return {
    employee
  };
}
