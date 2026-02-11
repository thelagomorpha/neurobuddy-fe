import "./globals.css";

export const metadata = {
  title: "NeuroBuddy Frontend",
  description: "Simple Next.js frontend for Hello World + database retrieval"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
