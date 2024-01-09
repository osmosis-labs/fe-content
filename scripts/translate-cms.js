import fs from "fs";
import path from "path";
import prettier from "prettier";
import { spawn } from "child_process";

const cmsDirectoryPath = "./cms";
const cacheLocationDirectory = "./project.inlang/.cache";
const cmsFiles = fs.readdirSync(cmsDirectoryPath);

if (!fs.existsSync(cacheLocationDirectory)) {
  fs.mkdirSync(cacheLocationDirectory, { recursive: true });
}

const inlangSettings = JSON.parse(
  fs.readFileSync("project.inlang/settings.json", "utf8")
);

async function writeFile(filePath, content) {
  const formatted = await prettier.format(JSON.stringify(content), {
    parser: "json",
  });
  fs.writeFileSync(path.resolve(cmsDirectoryPath, filePath), formatted, {
    encoding: "utf8",
  });
}

function spawnPromise(...command) {
  return new Promise((resolve, reject) => {
    const child = spawn(...command);

    // use child.stdout.setEncoding('utf8'); if you want text chunks
    child.stdout.on("data", (chunk) => {
      console.log(chunk.toString());
    });

    // since these are streams, you can pipe them elsewhere
    child.stderr.on("data", (chunk) => {
      console.log("Error: ", chunk.toString());
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`child process exited with code ${code}`));
      }
    });
  });
}

async function main() {
  // Create language files
  for (const languageTag of inlangSettings.languageTags) {
    const languageFilePath = path.resolve(
      cacheLocationDirectory,
      `${languageTag}.json`
    );

    if (!fs.existsSync(languageFilePath)) {
      writeFile(languageFilePath, {}, { encoding: "utf8" });
    }

    const languageContent = {};
    for (const filePath of cmsFiles) {
      const namespace = filePath.split(".")[0];
      const fileContent = JSON.parse(
        fs.readFileSync(path.resolve(cmsDirectoryPath, filePath), "utf8")
      );

      if (!fileContent.localization) {
        continue;
      }

      languageContent[namespace] =
        fileContent?.localization?.[languageTag] ?? {};
    }

    // Create en.json file with all namespaces
    await writeFile(
      path.resolve(cacheLocationDirectory, `${languageTag}.json`),
      languageContent
    );
  }

  await spawnPromise("inlang", [
    "machine",
    "translate",
    "-f",
    "--project",
    "./project.inlang",
  ]);

  for (const filePath of cmsFiles) {
    const namespace = filePath.split(".")[0];

    const content = JSON.parse(
      fs.readFileSync(path.resolve(cmsDirectoryPath, filePath), "utf8")
    );

    if (!content.localization) {
      continue;
    }

    // Create localization file for each language tag
    inlangSettings.languageTags.forEach((languageTag) => {});

    content.localization = inlangSettings.languageTags.reduce(
      (acc, languageTag) => {
        const localizationFile = JSON.parse(
          fs.readFileSync(
            path.join(cacheLocationDirectory, `${languageTag}.json`),
            "utf8"
          )
        );

        const namespaceContent = localizationFile[namespace];

        if (!namespaceContent) {
          return acc;
        }

        acc[languageTag] = namespaceContent;
        return acc;
      },
      {}
    );

    await writeFile(path.resolve(cmsDirectoryPath, filePath), content);
  }
}

main();
