import { createElement } from "react";
import { fetchHelloData } from "@/src/lib/api";

export const dynamic = "force-dynamic";

export const HomePage = async () => {
  const result = await fetchHelloData(process.env.BACKEND_API_BASE_URL);

  const tree = createElement(
    "main",
    { className: "page" },
    createElement(
      "section",
      { className: "card" },

      createElement("h1", null, "NeuroBuddy Web - Hello World"),
      createElement(
        "p",
        { className: "subtitle" },
        "Simple Next.js frontend connected to backend API data."
      ),

      createElement(
        "div",
        { className: "block" },
        createElement("h2", null, "Frontend Status"),
        createElement("p", null, "Running on Next.js.")
      ),

      createElement(
        "div",
        { className: "block" },
        createElement("h2", null, "Backend Message"),
        createElement(
          "p",
          null,
          result.ok ? result.data.message : "Unable to fetch backend data."
        )
      ),

      createElement(
        "div",
        { className: "block" },
        createElement("h2", null, "Database Status"),
        createElement(
          "p",
          null,
          result.ok ? String(result.data.database_connected) : "Unknown"
        )
      ),

      createElement(
        "div",
        { className: "block" },
        createElement("h2", null, "Database Details"),
        createElement(
          "p",
          null,
          result.ok ? result.data.database_message : "Unavailable"
        )
      ),

      createElement(
        "div",
        { className: "block" },
        createElement("h2", null, "Total Messages"),
        createElement(
          "p",
          null,
          result.ok ? String(result.data.total_messages) : "Unknown"
        )
      ),

      !result.ok
        ? createElement("p", { className: "error" }, result.error)
        : null
    )
  );

  return tree;
};

export default HomePage;
