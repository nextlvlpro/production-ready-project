import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Order Wallet
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          A simple, secure platform to manage users and orders.
          Built with PostgreSQL, Node.js, and Next.js.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-md bg-gray-900 px-6 py-3 text-white font-medium hover:bg-gray-800 transition"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-md border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
