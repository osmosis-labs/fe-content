import fs from "fs";
import path from "path";
import prettier from "prettier";

const cmsDirectoryPath = "./cms";
const localizationDirectoryPath = "./localizations";
const cmsFiles = fs.readdirSync(cmsDirectoryPath);

const inlangSettings = JSON.parse(
  fs.readFileSync("project.inlang/settings.json", "utf8")
);

cmsFiles.forEach(async (filePath) => {
  const content = JSON.parse(
    fs.readFileSync(path.resolve(cmsDirectoryPath, filePath), "utf8")
  );

  content.localization = inlangSettings.languageTags.reduce(
    (acc, languageTag) => {
      const localizationFile = JSON.parse(
        fs.readFileSync(
          path.join(localizationDirectoryPath, `${languageTag}.json`),
          "utf8"
        )
      );

      const namespace = filePath.split(".")[0];
      const namespaceContent = localizationFile[namespace];

      if (!namespaceContent) {
        return acc;
      }

      acc[languageTag] = { [namespace]: namespaceContent };
      return acc;
    },
    {}
  );

  const formatted = await prettier.format(JSON.stringify(content), {
    parser: "json",
  });
  fs.writeFileSync(path.resolve(cmsDirectoryPath, filePath), formatted, {
    encoding: "utf8",
  });
});
