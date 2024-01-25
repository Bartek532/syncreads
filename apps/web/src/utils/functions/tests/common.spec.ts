import { describe, it, expect } from "vitest";

import { removeProtocolsFromUrl } from "../common";
import { nonNullable } from "../common";

describe("nonNullable", () => {
  it("should return false if the value is null", () => {
    expect(nonNullable(null)).toBe(false);
  });

  it("should return false if the value is undefined", () => {
    expect(nonNullable(undefined)).toBe(false);
  });

  it.each(["test", 0, false, {}, []])(
    "should return true if the value is a non-null and non-undefined value: %s",
    (value) => {
      expect(nonNullable(value)).toBe(true);
    },
  );
});

describe("removeProtocolsFromUrl", () => {
  it("should remove http:// from the start of the URL", () => {
    expect(removeProtocolsFromUrl("http://example.com")).toBe("example.com");
  });

  it("should remove https:// from the start of the URL", () => {
    expect(removeProtocolsFromUrl("https://example.com")).toBe("example.com");
  });

  it("should remove www. from the start of the URL", () => {
    expect(removeProtocolsFromUrl("www.example.com")).toBe("example.com");
  });

  it("should remove protocol and www. from the start of the URL", () => {
    expect(removeProtocolsFromUrl("https://www.example.com")).toBe(
      "example.com",
    );
  });

  it("should not remove anything if the URL does not start with a protocol or www.", () => {
    expect(removeProtocolsFromUrl("example.com")).toBe("example.com");
  });
});
