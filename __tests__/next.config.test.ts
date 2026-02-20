import { describe, expect, it } from "vitest";
import nextConfig from "../next.config.mjs";

describe("next.config", () => {
  it("uses standalone output", () => {
    expect(nextConfig).toEqual({ output: "standalone" });
  });
});
