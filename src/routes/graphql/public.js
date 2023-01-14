import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import CustomLib from '../../utils/custom_lib.js';

export default async (modules) => {
  let schema = { contents: '' };
  CustomLib.constructSchema(path.join(__dirname, '../../../constants/graphql/schema/types'), schema);
  CustomLib.constructSchema(path.join(__dirname, '../../../constants/graphql/schema/public'), schema);

  const resolversPath = 'src/routes/graphql/resolvers';
  
  const RootQueryResolver = (await import(`./resolvers/queries/root_query.js`)).default(modules)
  const EmployeesQueryResolver = (await import(`./resolvers/queries/employees_query.js`)).default(modules);

  const EmployeeQueryResolver = (await import(`./resolvers/queries/employee_query.js`)).default(modules);

  const resolverMap = {
    RootQuery: RootQueryResolver,
    EmployeesQuery: EmployeesQueryResolver,
    Employee: EmployeeQueryResolver
  };

  return {
    schema: `${schema.contents}`,
    resolverMap
  }
}
