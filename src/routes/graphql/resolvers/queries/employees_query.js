export default (modules) => {
  async function employee(obj, { id }, context) {
    const employee = await context.sessionData.services.employee.getEmployeeById(id);
    if (!employee) return null;

    return { id: employee.id };
  }

  return { employee };
}
