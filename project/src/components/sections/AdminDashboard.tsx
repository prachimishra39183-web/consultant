
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default function AdminDashboard() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid name or password.');
        return;
      }

      navigate('/admin/dashboard');
    } catch {
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F5EC] px-5 py-12 text-black">

      {/* Decorative gold lighting */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#D8B96C]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#C49A45]/20 blur-3xl" />

      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute left-6 top-6 flex items-center gap-2 text-sm font-medium text-black transition hover:text-[#A77920]"
      >
        <ArrowLeft size={17} />
        Back to website
      </button>

      {/* Login panel */}
      <section className="relative w-full max-w-md rounded-3xl border border-[#C9A85D] bg-[#FFFDF8] p-7 shadow-[0_24px_70px_rgba(120,85,20,0.16)] sm:p-10">

        {/* Gold accent */}
        <div className="absolute left-10 right-10 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#B58A35] via-[#F0D995] to-[#B58A35]" />

        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A85D] bg-gradient-to-br from-[#FFF5D6] to-[#E8D3A0] shadow-sm">
            <Sparkles size={27} strokeWidth={1.5} className="text-black" />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#98701F]">
            Private Access
          </p>

          <h1 className="font-serif text-4xl font-semibold text-black">
            Admin Portal
          </h1>

          <p className="mt-3 text-sm leading-6 text-black">
            Welcome, Acharya Sunil Mahatma
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Admin name */}
          <div>
            <label
              htmlFor="admin-name"
              className="mb-2 block text-sm font-semibold text-black"
            >
              Admin name
            </label>

            <input
              id="admin-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="username"
              required
              placeholder="Enter admin name"
              className="w-full rounded-xl border border-[#D5C18E] bg-white px-4 py-4 text-sm text-black placeholder:text-[#686868] outline-none transition focus:border-[#A77920] focus:ring-2 focus:ring-[#C9A85D]/30"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-semibold text-black"
            >
              Password
            </label>

            <div className="flex items-center rounded-xl border border-[#D5C18E] bg-white transition focus-within:border-[#A77920] focus-within:ring-2 focus-within:ring-[#C9A85D]/30">
              <LockKeyhole
                size={18}
                className="ml-4 shrink-0 text-[#98701F]"
              />

              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="Enter password"
                className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm text-black placeholder:text-[#686868] outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="mr-4 text-black transition hover:text-[#A77920]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800"
            >
              {error}
            </p>
          )}

          {/* Gold sign-in button */}
          <button
            type="submit"
            disabled={loading || !name.trim() || !password}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#A77920] bg-gradient-to-r from-[#D7B45F] via-[#F0D995] to-[#D7B45F] px-5 py-4 text-sm font-bold text-black shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Secure Sign In'}
            {!loading && <LockKeyhole size={16} />}
          </button>
        </form>

        <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#D5BC7B] to-transparent" />

        <p className="text-center text-xs font-medium text-black">
          Restricted access · Authorized administrator only
        </p>
      </section>
    </main>
  );
}
