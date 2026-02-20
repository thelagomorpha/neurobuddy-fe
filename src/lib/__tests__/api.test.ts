import { buildHelloEndpoint, fetchHelloData, normalizeBaseUrl } from "../api";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const fetchMock = vi.fn();

describe("API URL helpers", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("normalizes base URL and strips trailing slash", () => {
    expect(normalizeBaseUrl("https://example.com/")).toBe("https://example.com");
  });

  it("uses local fallback when base URL is empty", () => {
    expect(normalizeBaseUrl("")).toBe("http://localhost:8000");
  });

  it("builds hello endpoint consistently", () => {
    expect(buildHelloEndpoint("https://api.neurobuddy.dev/")).toBe("https://api.neurobuddy.dev/api/hello/");
  });

  it("returns parsed data when backend responds with success", async () => {
    const payload = {
      message: "Hello World from Django Backend!",
      database_connected: true,
      database_message: "Database is connected!",
      total_messages: 2
    };

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(payload)
    });

    const result = await fetchHelloData("https://api.neurobuddy.dev/");

    expect(fetchMock).toHaveBeenCalledWith("https://api.neurobuddy.dev/api/hello/", {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store"
    });
    expect(result).toEqual({ ok: true, data: payload });
  });

  it("returns backend failure when response is not ok", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 503
    });

    const result = await fetchHelloData("https://api.neurobuddy.dev/");

    expect(result).toEqual({
      ok: false,
      error: "Backend request failed with status 503."
    });
  });

  it("returns network failure when fetch throws", async () => {
    fetchMock.mockRejectedValue(new Error("network unavailable"));

    const result = await fetchHelloData("https://api.neurobuddy.dev/");

    expect(result).toEqual({
      ok: false,
      error: "Network error when reaching backend at https://api.neurobuddy.dev/api/hello/."
    });
  });
});
