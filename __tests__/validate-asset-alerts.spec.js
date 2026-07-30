import fs from "fs";
import { expect, test } from "vitest";

// Draft-07 JSON schema cannot express cross-field comparisons, so the
// startDate/endDate relationship is enforced here instead.
const { alerts } = JSON.parse(
  fs.readFileSync("./cms/asset-alerts.json", "utf8")
);

test("asset alert date windows end after they start", () => {
  alerts.forEach(({ banner: { localStorageKey, startDate, endDate } }) => {
    if (startDate && endDate) {
      expect(
        new Date(endDate) > new Date(startDate),
        `${localStorageKey}: endDate must be after startDate`
      ).toBe(true);
    }
  });
});
