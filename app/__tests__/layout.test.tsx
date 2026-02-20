import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import RootLayout, { metadata } from "../layout";

describe("RootLayout", () => {
  it("exposes expected metadata", () => {
    expect(metadata.title).toBe("NeuroBuddy Frontend");
    expect(metadata.description).toBe("Simple Next.js frontend for Hello World + database retrieval");
  });

  it("renders html scaffold with children", () => {
    const markup = renderToStaticMarkup(RootLayout({ children: <div id="child">Hello</div> }));

    expect(markup).toContain("<html lang=\"en\">");
    expect(markup).toContain("<body><div id=\"child\">Hello</div></body>");
  });
});
