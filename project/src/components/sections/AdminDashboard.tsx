
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F3EA] px-5 py-12 text-[#344333]">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#D8C69D]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#B8C8B4]/30 blur-3xl" />

      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute left-6 top-6 flex items-center gap-2 text-sm text-[#68715E] hover:text-[#344333]"
      >
        <ArrowLeft size={17} />
        Back to website
      </button>

      <section className="relative w-full max-w-md rounded-3xl border border-[#D9CEB7] bg-white/85 p-7 shadow-xl backdrop-blur-xl sm:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D9C69D] bg-[#F4EDDD]">
            <Sparkles size={27} strokeWidth={1.5} />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#9B8251]">
            Private Access
          </p>

          <h1 className="font-serif text-4xl">Admin Portal</h1>

          <p className="mt-3 text-sm leading-6 text-[#7A7E6F]">
            Welcome, Acharya Sunil Mahatma
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="admin-name" className="mb-2 block text-sm font-medium">
              Admin name
            </label>
            <input
              id="admin-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="username"
              required
              placeholder="Enter admin name"
              className="w-full rounded-xl border border-[#DCD5C5] bg-[#FCFBF7] px-4 py-4 text-sm outline-none focus:border-[#A58C58] focus:ring-2 focus:ring-[#C8B17C]/20"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm font-medium">
              Password
            </label>
            <div className="flex items-center rounded-xl border border-[#DCD5C5] bg-[#FCFBF7] focus-within:border-[#A58C58]">
              <LockKeyhole size={18} className="ml-4 shrink-0 text-[#9B8251]" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="Enter password"
                className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="mr-4 text-[#898A7D]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !name.trim() || !password}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#344333] px-5 py-4 text-sm font-medium text-white transition hover:bg-[#455942] disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Secure Sign In'}
            {!loading && <LockKeyhole size={16} />}
          </button>
        </form>

        <p className="mt-7 text-center text-xs text-[#969487]">
          Restricted access · Authorized administrator only
        </p>
      </section>
    </main>
  );
}
