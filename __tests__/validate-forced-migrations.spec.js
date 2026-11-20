import fs from "fs";
import { expect, test } from "vitest";

// Draft-07 JSON schema cannot express cross-field rules, so they are enforced
// here instead.
const { migrations } = JSON.parse(
  fs.readFileSync("./cms/forced-migrations.json", "utf8"),
);

test("forced migration ids are unique", () => {
  const ids = migrations.map(({ id }) => id);
  expect(new Set(ids).size, "duplicate forced migration id").toBe(ids.length);
});

test("forced migrations don't convert into one of their own fromDenoms", () => {
  migrations.forEach(({ id, fromDenoms, toDenom }) => {
    expect(fromDenoms.includes(toDenom), `${id}: toDenom is a fromDenom`).toBe(
      false,
    );
  });
});

test("forced migration dates run start, escalate, deadline", () => {
  migrations.forEach(({ id, startDate, escalateDate, deadline }) => {
    const ordered = [startDate, escalateDate, deadline]
      .filter(Boolean)
      .map((date) => new Date(date).getTime());
    ordered.slice(1).forEach((time, i) => {
      expect(
        time > ordered[i],
        `${id}: startDate < escalateDate < deadline`,
      ).toBe(true);
    });
  });
});
