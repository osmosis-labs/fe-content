import Ajv from "ajv";
import fs from "fs";
import path from "path";
import { expect, test } from "vitest";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const directoryPath = "./cms";
const schemaDirectoryPath = "./schema.json";
const cmsFiles = fs.readdirSync(directoryPath);

cmsFiles.forEach((file) => {
  test(`Validate ${file}`, () => {
    const content = JSON.parse(
      fs.readFileSync(path.resolve(directoryPath, file), "utf8")
    );
    const schema = JSON.parse(
      fs.readFileSync(
        path.resolve(schemaDirectoryPath, content.$schema),
        "utf8"
      )
    );

    const isValid = ajv.validate(schema, content);

    if (!isValid) console.log(ajv.errors);
    expect(isValid).toBe(true);
  });
});
