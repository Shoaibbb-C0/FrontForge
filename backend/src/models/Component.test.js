import assert from "node:assert/strict";
import test from "node:test";
import Component from "./Component.js";

const fields = { name: "Test", slug: "test", description: "Preview test", category: "Hero" };

test("legacy records retain missing metadata", () => {
  const component = Component.hydrate(fields);
  assert.equal(component.preview, undefined);
  assert.equal(component.toJSON().preview, undefined);
});

test("preview defaults and explicit none remain distinct from legacy", () => {
  const component = new Component({ ...fields, preview: {} });
  assert.deepEqual(component.preview.toObject(), {
    type: "none", registryKey: "", html: "", css: "",
  });
});

test("HTML and registered metadata survive validation and serialization", async () => {
  for (const type of ["html", "registered"]) {
    const component = new Component({ ...fields, preview: {
      type, registryKey: "  editorial-split-hero  ",
      html: "<h1>Preview</h1>", css: "h1 { color: red; }",
    } });
    await component.validate();
    const saved = Component.hydrate(component.toObject());
    assert.equal(saved.preview.type, type);
    assert.equal(saved.preview.registryKey, "editorial-split-hero");
    assert.equal(saved.preview.html, "<h1>Preview</h1>");
    assert.equal(saved.preview.css, "h1 { color: red; }");
  }
});

test("invalid preview modes fail validation", async () => {
  const component = new Component({ ...fields, preview: { type: "javascript" } });
  await assert.rejects(component.validate(), /is not a valid enum value/);
});

test("component slugs and reference URLs are validated", async () => {
  const component = new Component({
    ...fields,
    slug: "Invalid Slug",
    reference: { url: "javascript:alert(1)" },
  });
  await assert.rejects(component.validate(), /Slug must use lowercase letters/);
});
