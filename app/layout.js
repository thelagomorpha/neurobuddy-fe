import "./globals.css";
import { createElement } from "react";

export const metadata = {
  title: "NeuroBuddy Frontend",
  description: "Simple Next.js frontend for Hello World + database retrieval"
};

export default function RootLayout({ children }) {
  return createElement(
    "html",
    { lang: "en" },
    createElement("body", null, children)
  );
}
