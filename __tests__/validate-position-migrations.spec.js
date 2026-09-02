import fs from "fs";
import { expect, test } from "vitest";

// Draft-07 JSON schema cannot express cross-field or cross-item constraints,
// so the structural invariants of the migration map are enforced here.
const { migrations, priceDivergenceTolerance, minAmountTolerance } = JSON.parse(
  fs.readFileSync("./cms/position-migrations.json", "utf8"),
);

test("a pool never migrates to itself", () => {
  migrations.forEach(({ fromPoolId, toPoolId }) => {
    expect(
      fromPoolId !== toPoolId,
      `pool ${fromPoolId} lists itself as its own destination`,
    ).toBe(true);
  });
});

test("each source pool appears at most once", () => {
  // The mapping is 1:1 from the source side. Two entries for one source would
  // make the destination ambiguous at runtime.
  const seen = new Set();
  migrations.forEach(({ fromPoolId }) => {
    expect(
      seen.has(fromPoolId) === false,
      `pool ${fromPoolId} appears as a source more than once`,
    ).toBe(true);
    seen.add(fromPoolId);
  });
});

test("no source pool is also a destination", () => {
  // A pool on both sides would mean migrating into a pool that is itself
  // being migrated away from, so positions could be moved twice.
  const destinations = new Set(migrations.map(({ toPoolId }) => toPoolId));
  migrations.forEach(({ fromPoolId }) => {
    expect(
      destinations.has(fromPoolId) === false,
      `pool ${fromPoolId} is both a migration source and a destination`,
    ).toBe(true);
  });
});

test("min amount tolerance is looser than the price divergence gate", () => {
  // The price gate is the strict check on destination pricing. The min-amount
  // tolerance absorbs block-to-block drift between simulation and broadcast,
  // so tightening it to the gate's level would revert honest migrations.
  expect(
    minAmountTolerance > priceDivergenceTolerance,
    `minAmountTolerance (${minAmountTolerance}) must exceed priceDivergenceTolerance (${priceDivergenceTolerance})`,
  ).toBe(true);
});
