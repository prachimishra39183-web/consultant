
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Inbox,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  Clock,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  CircleDollarSign,
  Sun,
  Search,
  Bell,
  Activity,
  Plus,
} from 'lucide-react';

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Appointments', icon: CalendarDays },
  { label: 'Clients', icon: Users },
  { label: 'Enquiries', icon: Inbox },
  { label: 'Packages', icon: Package },
  { label: 'Settings', icon: Settings },
];

const stats = [
  {
    label: 'Total Clients',
    value: '—',
    detail: 'Registered clients',
    icon: Users,
    color: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-200/70',
  },
  {
    label: 'Appointments',
    value: '—',
    detail: 'Scheduled sessions',
    icon: CalendarDays,
    color: 'from-violet-500 to-indigo-600',
    glow: 'shadow-violet-500/20',
  },
  {
    label: 'Upcoming',
    value: '—',
    detail: 'Future consultations',
    icon: Clock,
    color: 'from-amber-400 to-orange-500',
    glow: 'shadow-orange-500/20',
  },
  {
    label: 'New Enquiries',
    value: '—',
    detail: 'Awaiting follow-up',
    icon: Inbox,
    color: 'from-emerald-400 to-teal-600',
    glow: 'shadow-emerald-500/20',
  },
];

export default function AdminHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function verifySession() {
      try {
        const response = await fetch('/api/admin/session', {
          credentials: 'include',
        });

        if (!response.ok) {
          navigate('/admin/login', { replace: true });
          return;
        }

        const data = await response.json();

        if (data.authenticated !== true) {
          navigate('/admin/login', { replace: true });
          return;
        }
      } catch {
        navigate('/admin/login', { replace: true });
        return;
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  async function handleLogout() {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      navigate('/admin/login', { replace: true });
    } catch {
      window.alert('Unable to sign out. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen overflow-hidden bg-[#F8FAFF] text-slate-800 md:flex">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
          <p className="text-sm tracking-wide">Securing your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8FAFF] text-slate-800 md:flex">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
  <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-400/15 blur-[120px]" />
  <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-violet-100 blur-[140px]" />
  <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-300/15 blur-[120px]" />
</div>

      {menuOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
       className={`fixed inset-y-0 left-0 z-50 flex w-[265px] flex-col
border-r border-slate-200 bg-white/95 p-5 backdrop-blur-2xl
transition-transform duration-300 md:sticky md:top-0 md:h-screen
md:translate-x-0 ${
  menuOpen ? 'translate-x-0' : '-translate-x-full'
}`}
      >
        <div className="mb-10 flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 shadow-lg shadow-blue-200/70">
              <Sun size={23} className="text-white" />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold tracking-wide">
                Acharya Sunil
              </p>
              <p className="mt-0.5 text-[10px] font-semibold tracking-[0.28em] text-blue-600">
                ADMIN STUDIO
              </p>
            </div>
          </div>

          <button
            className="text-slate-500 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
          Workspace
        </div>

        <nav className="space-y-2">
          {navigation.map(({ label, icon: Icon }) => {
            const active = activeTab === label;

            return (
              <button
                key={label}
                onClick={() => {
                  setActiveTab(label);
                  setMenuOpen(false);
                }}
                className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-300 ${
                  active
                    ? 'border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200/70'
                    : 'border-transparent text-slate-600 hover:translate-x-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {active && (
                  <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-gradient-to-b from-white to-blue-200" />
                )}

                <Icon
                  size={18}
                  className={
                    active
                      ? 'text-blue-600'
                      : 'text-slate-500 group-hover:text-blue-600'
                  }
                />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={15} className="text-blue-600" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="mb-4 overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-500/15 via-indigo-50 to-cyan-50 p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Sparkles size={18} />
            </div>
            <p className="text-sm font-semibold">Your workspace</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Manage appointments, clients and consultation enquiries in one place.
            </p>
          </div>

          <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-blue-50/70 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Administrator</p>
              <p className="text-xs text-slate-500">Signed in</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.6)]" />
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-sm text-slate-600 transition hover:border-red-400/10 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="relative min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-2xl sm:px-8 lg:px-10">
          <button
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={19} />
          </button>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Admin workspace / {activeTab}
            </p>
            <h1 className="mt-1 truncate text-xl font-semibold tracking-tight sm:text-2xl">
              {activeTab === 'Dashboard'
                ? 'Good to see you again'
                : activeTab}
            </h1>
          </div>

          <div className="relative hidden sm:block">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search workspace..."
              aria-label="Search workspace"
              className="w-44 rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:bg-white lg:w-60"
            />
          </div>

          <button
            aria-label="Notifications"
            title="Notifications"
            onClick={() => setActiveTab('Enquiries')}
            className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-blue-50"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
          </button>
        </header>

        <div className="mx-auto max-w-[1600px] p-5 sm:p-8 lg:p-10">
          {activeTab === 'Dashboard' ? (
            <>
              {/* Hero panel */}
              <section className="relative mb-8 overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 shadow-2xl shadow-blue-200/50 sm:p-9">
                <div className="pointer-events-none absolute -right-12 -top-28 h-72 w-72 rounded-full border border-cyan-200/10 bg-blue-100/70 shadow-[0_0_100px_rgba(34,211,238,.12)]" />
                <div className="pointer-events-none absolute -right-2 -top-16 h-52 w-52 rounded-full border border-blue-200/10" />
                <div className="pointer-events-none absolute bottom-0 right-32 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div className="max-w-xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">
                      <Sparkles size={13} />
                      Your control center
                    </div>
                    <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
                      Clarity for every
                      <span className="block bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        consultation.
                      </span>
                    </h2>
                    <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600">
                      Track your client relationships, manage upcoming
                      sessions, and keep every enquiry organized.
                    </p>
                    <button
                      onClick={() => setActiveTab('Appointments')}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/70 transition hover:-translate-y-0.5 hover:shadow-blue-400/30"
                    >
                      View appointments
                      <ArrowUpRight size={17} />
                    </button>
                  </div>

                  <div className="relative mx-auto flex h-44 w-44 shrink-0 items-center justify-center md:mr-6 lg:h-52 lg:w-52">
                    <div className="absolute inset-0 rounded-full border border-blue-200" />
                    <div className="absolute inset-4 rounded-full border border-blue-200" />
                    <div className="absolute inset-8 rounded-full border border-violet-200" />
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 blur-xl" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-[30px] border border-blue-200 bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 shadow-[0_15px_45px_rgba(37,99,235,.25)] [transform:rotate(-8deg)]">
                      <Sun
                        size={43}
                        strokeWidth={1.2}
                        className="text-blue-700 [transform:rotate(8deg)]"
                      />
                    </div>
                    <span className="absolute right-5 top-7 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,.35)]" />
                    <span className="absolute bottom-8 left-4 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(139,92,246,.35)]" />
                  </div>
                </div>
              </section>

              {/* Statistics */}
              <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, detail, icon: Icon, color, glow }, index) => (
                  <div
                    key={label}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50 p-5 shadow-xl shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl sm:p-6"
                    style={{ perspective: '800px' }}
                  >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100/70 blur-2xl transition group-hover:bg-blue-100" />
                    <div className="relative flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-600">{label}</p>
                        <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
                          {value}
                        </p>
                      </div>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} ${glow} shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110`}>
                        <Icon size={21} className="text-white" />
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                      <span className="text-xs text-slate-500">{detail}</span>
                      <span className="text-[10px] text-slate-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main dashboard panels */}
              <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50 p-5 shadow-xl shadow-slate-200/70 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                          <CalendarDays size={18} />
                        </div>
                        <h3 className="font-semibold">Upcoming consultations</h3>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        Your next scheduled client sessions
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('Appointments')}
                      className="inline-flex items-center gap-1 text-xs text-blue-600 transition hover:text-blue-700"
                    >
                      View all <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="mt-7 rounded-xl border border-dashed border-slate-200 bg-blue-50/70 px-5 py-12 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-100 to-violet-100 text-blue-600">
                      <CalendarDays size={25} />
                    </div>
                    <p className="text-sm font-medium text-slate-800">
                      Ready for your first appointment
                    </p>
                    <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500">
                      Connect your appointment records to see client names,
                      dates, consultation types and session statuses here.
                    </p>
                    <button
                      onClick={() => setActiveTab('Appointments')}
                      className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-blue-50"
                    >
                      <Plus size={14} />
                      Open appointments
                    </button>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50 p-5 shadow-xl shadow-slate-200/70 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-violet-100 p-2 text-violet-600">
                      <Activity size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Workspace activity</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        A quick view of your operations
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      {
                        title: 'Client management',
                        desc: 'View your registered clients',
                        icon: Users,
                        tab: 'Clients',
                        color: 'text-blue-600 bg-blue-100',
                      },
                      {
                        title: 'Enquiry inbox',
                        desc: 'Review incoming requests',
                        icon: Inbox,
                        tab: 'Enquiries',
                        color: 'text-violet-600 bg-violet-100',
                      },
                      {
                        title: 'Consultation packages',
                        desc: 'Review your service packages',
                        icon: CircleDollarSign,
                        tab: 'Packages',
                        color: 'text-amber-600 bg-amber-100',
                      },
                    ].map(({ title, desc, icon: Icon, tab, color }) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-blue-50/70 p-3.5 text-left transition hover:border-blue-200 hover:bg-blue-50"
                      >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{title}</p>
                          <p className="mt-1 text-xs text-slate-500">{desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-600" />
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              <p className="mt-8 text-center text-[10px] tracking-wide text-slate-600">
                ACHARYA SUNIL MAHATMA · ADMIN WORKSPACE
              </p>
            </>
          ) : (
            <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50 p-6 shadow-xl sm:p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                {activeTab === 'Appointments' && <CalendarDays size={25} />}
                {activeTab === 'Clients' && <Users size={25} />}
                {activeTab === 'Enquiries' && <Inbox size={25} />}
                {activeTab === 'Packages' && <Package size={25} />}
                {activeTab === 'Settings' && <Settings size={25} />}
              </div>

              <h2 className="font-serif text-3xl font-medium">{activeTab}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                {activeTab === 'Appointments' &&
                  'Manage consultation dates, client details, booking status and rescheduling.'}
                {activeTab === 'Clients' &&
                  'View client contact details, consultation history and service notes.'}
                {activeTab === 'Enquiries' &&
                  'Review website enquiries and track which requests need a follow-up.'}
                {activeTab === 'Packages' &&
                  'Manage the consultation packages and pricing displayed on your website.'}
                {activeTab === 'Settings' &&
                  'Manage your admin workspace and account preferences.'}
              </p>

              <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-blue-50/70 p-8 text-center">
                <p className="font-medium text-slate-800">
                  Database integration required
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  This section needs its API and database connection before
                  it can display or modify real records.
                </p>
                <button
                  onClick={() => setActiveTab('Dashboard')}
                  className="mt-5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Back to dashboard
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
