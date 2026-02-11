import { buildHelloEndpoint, normalizeBaseUrl } from "../api";
import { describe, expect, it } from "vitest";

describe("API URL helpers", () => {
  it("normalizes base URL and strips trailing slash", () => {
    expect(normalizeBaseUrl("https://example.com/")).toBe("https://example.com");
  });

  it("uses local fallback when base URL is empty", () => {
    expect(normalizeBaseUrl("")).toBe("http://localhost:8000");
  });

  it("builds hello endpoint consistently", () => {
    expect(buildHelloEndpoint("https://api.neurobuddy.dev/")).toBe("https://api.neurobuddy.dev/api/hello/");
  });
});
