import fs from "fs";
import path from "path";

// Function to recursively read all JSON files in a directory
export function readJsonFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files = [...files, ...readJsonFiles(fullPath)]; // Recurse into directories
    } else if (path.extname(file) === ".json") {
      files.push(fullPath);
    }
  });
  return files;
}
