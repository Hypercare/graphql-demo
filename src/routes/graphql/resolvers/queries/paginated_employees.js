import _ from 'lodash';

import PaginatedResults from '../interfaces/paginated_results.js';

export default (modules) => {
  const PaginatedResultsInterface = PaginatedResults(modules);

  async function employees(obj, args, context) {
    return _.map(obj.ids, id => ({ id }));
  }

  return _.assign(PaginatedResultsInterface, {
    employees
  });
}
