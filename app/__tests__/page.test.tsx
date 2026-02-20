import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchHelloData } from "@/src/lib/api";

vi.mock("@/src/lib/api", () => ({
  fetchHelloData: vi.fn()
}));

const fetchHelloDataMock = vi.mocked(fetchHelloData);

describe("HomePage", () => {
  beforeEach(() => {
    fetchHelloDataMock.mockReset();
    process.env.BACKEND_API_BASE_URL = "http://example.test";
  });

  it("renders backend values when request succeeds", async () => {
    fetchHelloDataMock.mockResolvedValue({
      ok: true,
      data: {
        message: "Hello World from Django Backend!",
        database_connected: true,
        database_message: "Database is connected!",
        total_messages: 2
      }
    });

    const { default: HomePage } = await import("../page");
    const markup = renderToStaticMarkup(await HomePage());

    expect(markup).toContain("Hello World from Django Backend!");
    expect(markup).toContain("Database is connected!");
    expect(markup).toContain(">2<");
    expect(markup).not.toContain("Unable to fetch backend data.");
  });

  it("renders fallback state when request fails", async () => {
    fetchHelloDataMock.mockResolvedValue({
      ok: false,
      error: "Network error when reaching backend at http://example.test/api/hello/."
    });

    const { default: HomePage } = await import("../page");
    const markup = renderToStaticMarkup(await HomePage());

    expect(markup).toContain("Unable to fetch backend data.");
    expect(markup).toContain("Unknown");
    expect(markup).toContain("Unavailable");
    expect(markup).toContain("Network error when reaching backend");
  });
});
