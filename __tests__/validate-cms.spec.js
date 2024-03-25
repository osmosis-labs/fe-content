import Ajv from "ajv";
import fs from "fs";
import path from "path";
import { expect, test } from "vitest";
import addFormats from "ajv-formats";
import { readJsonFiles } from "../utils";

const ajv = new Ajv();
addFormats(ajv);

const directoryPath = "./cms";

const cmsFiles = readJsonFiles(directoryPath);

cmsFiles.forEach((filePath) => {
  const fileName = path.basename(filePath);
  test(`Validate ${fileName}`, () => {
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const schemaPath = path.resolve(filePath, "..", content.$schema);
    const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

    const isValid = ajv.validate(schema, content);

    if (!isValid) console.log(ajv.errors);
    expect(isValid).toBe(true);
  });
});
