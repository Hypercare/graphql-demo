export default (modules) => {
  async function employee(obj, { id }, context) {
    const employee = await context.sessionData.services.employee.getEmployeeById(id);
    if (!employee) return null;

    return { id: employee.id };
  }

  async function employees(obj, { limit, after }, context) {
    const employeeIds = await context.sessionData.services.employee.getPaginatedEmployees(
      after,
      limit
    );

    return {
      ids: employeeIds
    };
  }

  return {
    employee,
    employees
  };
}
