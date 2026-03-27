import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>404 - Page Not Found</h1>
      <p style={{ marginBottom: "1rem" }}>
        The page or profile you requested does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </main>
  );
}