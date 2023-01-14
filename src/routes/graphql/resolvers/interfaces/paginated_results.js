import _ from 'lodash';

export default (modules) => {
  function totalCount(obj, args, context) {
    return _.size(obj.ids);
  }

  return {
    totalCount
  };
}
