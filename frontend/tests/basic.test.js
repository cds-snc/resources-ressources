import { describe, it, expect } from "vitest";
import { setup } from "@nuxt/test-utils-edge";

describe("My test", () => {
  setup({
    // test context options
  });

  it("is my test", () => {
    expect(1).toEqual(1);
  });
});
