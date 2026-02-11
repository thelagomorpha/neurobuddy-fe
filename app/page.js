import { fetchHelloData } from "@/src/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const result = await fetchHelloData(process.env.BACKEND_API_BASE_URL);

  return (
    <main className="page">
      <section className="card">
        <h1>NeuroBuddy Web - Hello World</h1>
        <p className="subtitle">Simple Next.js frontend connected to backend API data.</p>

        <div className="block">
          <h2>Frontend Status</h2>
          <p>Running on Next.js.</p>
        </div>

        <div className="block">
          <h2>Backend Message</h2>
          <p>{result.ok ? result.data.message : "Unable to fetch backend data."}</p>
        </div>

        <div className="block">
          <h2>Database Status</h2>
          <p>{result.ok ? String(result.data.database_connected) : "Unknown"}</p>
        </div>

        <div className="block">
          <h2>Database Details</h2>
          <p>{result.ok ? result.data.database_message : "Unavailable"}</p>
        </div>

        <div className="block">
          <h2>Total Messages</h2>
          <p>{result.ok ? String(result.data.total_messages) : "Unknown"}</p>
        </div>

        {!result.ok ? <p className="error">{result.error}</p> : null}
      </section>
    </main>
  );
}
