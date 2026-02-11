export function normalizeBaseUrl(baseUrl) {
  const fallback = "http://localhost:8000";
  return (baseUrl || fallback).replace(/\/+$/, "");
}

export function buildHelloEndpoint(baseUrl) {
  return `${normalizeBaseUrl(baseUrl)}/api/hello/`;
}

export async function fetchHelloData(baseUrl) {
  const endpoint = buildHelloEndpoint(baseUrl);

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `Backend request failed with status ${response.status}.`
      };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: `Network error when reaching backend at ${endpoint}.`
    };
  }
}
