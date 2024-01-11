### FE Content

This repository serves as a Content Management System (CMS) for the [Osmosis Frontend](https://github.com/osmosis-labs/osmosis-frontend).

#### Translation

The content in this repository is available in various languages, with translations automatically handled by inlang. Follow these steps to translate content:

1. Add an English translation in the CMS file under the localization property by inserting an "en" key.
   Example:
   ```json
   "localization": {
       "en": {}
   }
   ```
2. After committing and pushing changes to a branch, the CI process will automatically add the translations to the same branch.
3. To manually handle translations, execute the command `yarn inline-translations`.
