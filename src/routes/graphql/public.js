import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import CustomLib from '../../utils/custom_lib.js';

export default (modules) => {
  let schema = { contents: '' };
  CustomLib.constructSchema(path.join(__dirname, '../../../constants/graphql/schema/types'), schema);
  CustomLib.constructSchema(path.join(__dirname, '../../../constants/graphql/schema/public'), schema);

  const resolverMap = {

  };

  return {
    schema: `${schema.contents}`,
    resolverMap
  }
}
