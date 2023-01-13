import fs from 'fs';
import path from 'path';

function constructSchema(directoryPath, schema) {
  const fileNames = fs.readdirSync(directoryPath);
  fileNames.forEach((fileName) => {
    const absolutePath = path.join(directoryPath, fileName);
    if (fs.statSync(absolutePath).isDirectory()) {
      constructSchema(absolutePath, schema);
    } else {
      const fileContents = fs.readFileSync(absolutePath).toString();
      if (schema.contents === "") {
        schema.contents += fileContents;
      } else {
        schema.contents += "\n\n" + fileContents;
      }
    }
  });
}

export default {
  constructSchema
}
