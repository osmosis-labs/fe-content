const fs = require("fs");
const path = require("path");

// Load the settings
const settings = JSON.parse(
  fs.readFileSync("project.inlang/settings.json", "utf8")
);

// Load the banner file
const obj = JSON.parse(
  fs.readFileSync("cms/top-announcement-banner.json", "utf8")
);

/**
 * Set a value in an object using a path.
 *
 * @example
 * // Set the value of `object.a.b.c` to `3`
 * setObjValue(object, "a.b.c", 3);
 */
function setObjValue(object, path, value) {
  const clone = { ...object };
  const way = path.replace(/\[/g, ".").replace(/\]/g, "").split("."),
    last = way.pop();

  way.reduce(function (o, k, i, kk) {
    return (o[k] =
      o[k] || (isFinite(i + 1 in kk ? kk[i + 1] : last) ? [] : {}));
  }, object)[last] = value;
  return clone;
}

/**
 * Get a value in an object using a path.
 * @example
 * // Get the value of `object.a.b.c`
 * getObjValue("a.b.c", object);
 */
function getObjValue(key, object) {
  return key.split(".").reduce((o, i) => o[i], object);
}

// Iterate over each language
settings.languageTags.forEach((languageTag) => {
  // Load the localization file for this language
  const localization = JSON.parse(
    fs.readFileSync(path.join("localizations", `${languageTag}.json`), "utf8")
  );

  let resultObj = { ...obj };
  Object.entries(resultObj).forEach(([key, value]) => {
    // Set the value in the banner object
    resultObj = setObjValue(
      obj,
      `${key}.enTextOrLocalizationPath`,
      languageTag
    );

    // Inline the translations
    obj[key][`enTextOrLocalizationPath`] =
      localization[obj[key].enTextOrLocalizationPath];
  });

  setObjValue(banner, `banner.enTextOrLocalizationPath`, languageTag);
  // Inline the translations
  banner.banner[`enTextOrLocalizationPath`] =
    localization[banner.banner.enTextOrLocalizationPath];
  banner.banner.link[`enTextOrLocalizationKey`] =
    localization[banner.banner.link.enTextOrLocalizationKey];
});

// Save the updated banner file
fs.writeFileSync(
  "cms/top-announcement-banner.json",
  JSON.stringify(banner, null, 2),
  "utf8"
);
