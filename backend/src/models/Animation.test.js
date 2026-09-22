import assert from "node:assert/strict";
import test from "node:test";
import Animation from "./Animation.js";

const fields = {
  name: "Fade up",
  slug: "fade-up",
  description: "A test animation",
  category: "Entrance",
  library: "css",
  trigger: "load",
};

test("valid animation data passes schema validation", async () => {
  const animation = new Animation(fields);
  await animation.validate();
  assert.equal(animation.status, "draft");
  assert.equal(animation.preview.type, "none");
});

test("animation slugs must be URL safe", async () => {
  const animation = new Animation({ ...fields, slug: "Fade Up!" });
  await assert.rejects(animation.validate(), /Slug must use lowercase letters/);
});

test("animation library and trigger values are constrained", async () => {
  const animation = new Animation({ ...fields, library: "unknown", trigger: "unknown" });
  await assert.rejects(animation.validate(), /is not a valid enum value/);
});
