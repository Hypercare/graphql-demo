export default (modules) => {
  async function id(obj, args, context) {
    return obj.id;
  }

  async function firstName(obj, args, context) {
    const employee = await context.sessionData.services.employee.getEmployeeById(obj.id);
    return employee.firstName;
  }

  async function lastName(obj, args, context) {
    const employee = await context.sessionData.services.employee.getEmployeeById(obj.id);
    return employee.lastName;
  }

  return {
    id,
    firstName,
    lastName
  };
}
