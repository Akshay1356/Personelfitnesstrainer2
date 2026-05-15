import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-bold">
          Admin Dashboard
        </h1>

        <Link
          to="/"
          className="bg-white text-black px-5 py-3 rounded-2xl font-bold"
        >
          Back Home
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
          <p className="text-zinc-400">Revenue</p>
          <h2 className="text-4xl font-bold mt-3">₹85K</h2>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
          <p className="text-zinc-400">Clients</p>
          <h2 className="text-4xl font-bold mt-3">48</h2>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
          <p className="text-zinc-400">Programs Sold</p>
          <h2 className="text-4xl font-bold mt-3">132</h2>
        </div>
      </div>
    </div>
  );
}