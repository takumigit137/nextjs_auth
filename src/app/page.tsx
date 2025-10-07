import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Welcome to My Auth App</h1>
      <Link href="/register">
        <button style={{ marginRight: 10, padding: '8px 16px', cursor: 'pointer' }}>
          New registration
        </button>
      </Link>
      <Link href="/login">
        <button style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Login
        </button>
      </Link>
    </main>
  );
}