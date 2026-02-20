type HelloData = {
  message: string;
  database_connected: boolean;
  database_message: string;
  total_messages: number;
};

export type FetchHelloResult =
  | {
      ok: true;
      data: HelloData;
    }
  | {
      ok: false;
      error: string;
    };

export function normalizeBaseUrl(baseUrl?: string): string {
  const fallback = "http://localhost:8000";
  return (baseUrl || fallback).replace(/\/+$/, "");
}

export function buildHelloEndpoint(baseUrl?: string): string {
  return `${normalizeBaseUrl(baseUrl)}/api/hello/`;
}

export async function fetchHelloData(baseUrl?: string): Promise<FetchHelloResult> {
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

    const data = (await response.json()) as HelloData;
    return { ok: true, data };
  } catch {
    return {
      ok: false,
      error: `Network error when reaching backend at ${endpoint}.`
    };
  }
}
