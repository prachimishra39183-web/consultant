
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, CalendarDays, Users, Inbox, Package, Settings,
  LogOut, Menu, X, Clock, ArrowUpRight, Sparkles, ChevronRight,
  CircleDollarSign, Sun, Search, Bell, Activity, RefreshCw,
  CheckCircle2, XCircle, AlertCircle, Phone, Mail, MapPin,
} from 'lucide-react';

type RecordData = Record<string, any>;

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Appointments', icon: CalendarDays },
  { label: 'Clients', icon: Users },
  { label: 'Enquiries', icon: Inbox },
  { label: 'Packages', icon: Package },
  { label: 'Settings', icon: Settings },
];

const getValue = (item: RecordData, ...keys: string[]) => {
  for (const key of keys) {
    if (item?.[key] !== undefined && item[key] !== null && item[key] !== '') {
      return item[key];
    }
  }
  return '—';
};

const formatDate = (value: unknown) => {
  if (!value || value === '—') return 'Not scheduled';
  const date = new Date(String(value));
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
};

const statusClass = (status: unknown) => {
  const value = String(status || '').toLowerCase();

  if (['confirmed', 'verified', 'converted', 'completed'].includes(value)) {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }
  if (['cancelled', 'canceled', 'closed', 'rejected'].includes(value)) {
    return 'bg-red-50 text-red-700 border-red-200';
  }
  if (['contacted', 'in_progress', 'pending'].includes(value)) {
    return 'bg-amber-50 text-amber-700 border-amber-200';
  }
  return 'bg-blue-50 text-blue-700 border-blue-200';
};

export default function AdminHome() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [dashboard, setDashboard] = useState<RecordData | null>(null);
  const [enquiries, setEnquiries] = useState<RecordData[]>([]);
  const [clients, setClients] = useState<RecordData[]>([]);
  const [bookings, setBookings] = useState<RecordData[]>([]);

  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [busyId, setBusyId] = useState('');

  const apiRequest = useCallback(
    async (action: string, method = 'GET', body?: object) => {
      const response = await fetch(
        `/api/admin?action=${encodeURIComponent(action)}`,
        {
          method,
          credentials: 'include',
          headers: body
            ? { 'Content-Type': 'application/json' }
            : undefined,
          body: body ? JSON.stringify(body) : undefined,
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        navigate('/admin/login', { replace: true });
        throw new Error('Your session expired. Please sign in again.');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Request failed.');
      }

      return data;
    },
    [navigate]
  );

  const loadTab = useCallback(
    async (tab = activeTab) => {
      setDataLoading(true);
      setError('');

      try {
        if (tab === 'Dashboard') {
          setDashboard(await apiRequest('dashboard'));
        } else if (tab === 'Enquiries') {
          const data = await apiRequest('enquiries');
          setEnquiries(data.enquiries || []);
        } else if (tab === 'Clients') {
          const data = await apiRequest('clients');
          setClients(data.clients || []);
        } else if (tab === 'Appointments') {
          const data = await apiRequest('bookings');
          setBookings(data.bookings || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load records.');
      } finally {
        setDataLoading(false);
      }
    },
    [activeTab, apiRequest]
  );

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
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    if (!loading) void loadTab(activeTab);
  }, [loading, activeTab, loadTab]);

  async function handleLogout() {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Logout failed');
      navigate('/admin/login', { replace: true });
    } catch {
      window.alert('Unable to sign out. Please try again.');
    }
  }

  async function performAction(
    action: string,
    body: RecordData,
    successMessage: string,
    id?: string
  ) {
    setBusyId(id || action);
    setError('');
    setActionMessage('');

    try {
      await apiRequest(action, 'POST', body);
      setActionMessage(successMessage);
      await loadTab(activeTab);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed.');
    } finally {
      setBusyId('');
    }
  }

  async function updateEnquiry(item: RecordData, status: string) {
    const id = getValue(item, 'id', 'enquiry_id');

    if (id === '—') {
      setError('This enquiry has no ID. Check your API response.');
      return;
    }

    await performAction(
      'update-enquiry',
      { id, status },
      'Enquiry status updated.',
      String(id)
    );
  }

  async function verifyPayment(item: RecordData) {
    const id = getValue(item, 'id', 'booking_id');

    if (id === '—') {
      setError('This booking has no ID. Check your API response.');
      return;
    }

    const reference = window.prompt(
      'Enter the payment reference or transaction ID after checking the actual payment in your bank or UPI records:'
    );

    if (!reference?.trim()) return;

    const confirmed = window.confirm(
      'Have you independently confirmed that the payment was received?'
    );

    if (!confirmed) return;

    await performAction(
      'verify-payment',
      { id, paymentReference: reference.trim() },
      'Payment marked as verified.',
      String(id)
    );
  }

  async function updateBooking(item: RecordData, action: string) {
    const id = getValue(item, 'id', 'booking_id');

    if (id === '—') {
      setError('This booking has no ID. Check your API response.');
      return;
    }

    const currentPayment = String(
      getValue(item, 'payment_status', 'paymentStatus')
    ).toLowerCase();

    if (action === 'confirm' && currentPayment !== 'verified') {
      setError('Verify the payment before confirming this booking.');
      return;
    }

    let selectedSlot: string | undefined;

    if (action === 'confirm') {
      const currentSlot = getValue(
        item,
        'selected_slot',
        'selectedSlot',
        'booking_date',
        'bookingDate'
      );

      const enteredSlot = window.prompt(
        'Enter the appointment date and time in ISO format, e.g. 2026-11-05T15:00:00+05:30',
        currentSlot === '—' ? '' : String(currentSlot)
      );

      if (!enteredSlot?.trim()) return;

      const parsed = new Date(enteredSlot);

      if (Number.isNaN(parsed.getTime()) || parsed <= new Date()) {
        setError('Enter a valid future date and time.');
        return;
      }

      selectedSlot = enteredSlot.trim();
    }

    const confirmed = window.confirm(
      action === 'cancel'
        ? 'Cancel this appointment?'
        : action === 'complete'
          ? 'Mark this appointment as completed?'
          : 'Confirm this appointment?'
    );

    if (!confirmed) return;

    await performAction(
      'update-booking',
      {
  id,
  status:
    action === 'confirm'
      ? 'confirmed'
      : action === 'cancel'
        ? 'cancelled'
        : 'completed',
  ...(selectedSlot ? { selectedSlot } : {}),
},
      `Appointment ${action === 'confirm' ? 'confirmed' : action === 'cancel' ? 'cancelled' : 'updated'}.`,
      String(id)
    );
  }

const filteredEnquiries = useMemo(
  () =>
    enquiries.filter((item) =>
      [
        getValue(item, 'name', 'full_name'),
        getValue(item, 'contact', 'phone', 'email', 'phone_or_email'),
        getValue(item, 'location', 'property_location'),
        getValue(item, 'property_type', 'propertyType'),
        getValue(item, 'details', 'property_details', 'message'),
        getValue(item, 'enquiry_status', 'status'),
      ]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    ),
  [enquiries, search]
);

  const filteredClients = useMemo(
    () =>
      clients.filter((item) =>
        [
          getValue(item, 'name'),
          getValue(item, 'contact', 'phone', 'email'),
        ]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [clients, search]
  );

  const filteredBookings = useMemo(
    () =>
      bookings.filter((item) =>
        [
          getValue(item, 'name', 'client_name'),
          getValue(item, 'contact', 'phone', 'email'),
          getValue(item, 'booking_status', 'status'),
          getValue(item, 'payment_status'),
        ]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [bookings, search]
  );

  const stats = [
    {
      label: 'Total Enquiries',
      value: dashboard?.stats?.totalEnquiries ?? enquiries.length,
      detail: 'Enquiry records',
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      label: 'Confirmed Sessions',
      value: dashboard?.stats?.confirmedBookings ?? '—',
      detail: 'Confirmed appointments',
      icon: CalendarDays,
      color: 'from-violet-500 to-indigo-600',
    },
    {
      label: 'Upcoming',
      value: dashboard?.upcomingBookings?.length ?? '—',
      detail: 'Next scheduled sessions',
      icon: Clock,
      color: 'from-amber-400 to-orange-500',
    },
    {
      label: 'New Enquiries',
      value: dashboard?.stats?.newEnquiries ?? '—',
      detail: 'Awaiting follow-up',
      icon: Inbox,
      color: 'from-emerald-400 to-teal-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFF] text-slate-700">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
          <p className="text-sm">Securing your workspace...</p>
        </div>
      </div>
    );
  }

  const upcomingBookings: RecordData[] = dashboard?.upcomingBookings || [];

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8FAFF] text-slate-800 md:flex">
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

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[265px] flex-col border-r border-slate-200 bg-white/95 p-5 backdrop-blur-2xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-10 flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 shadow-lg shadow-blue-200/70">
              <Sun size={23} className="text-white" />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold">Acharya Sunil</p>
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

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
          Workspace
        </p>

        <nav className="space-y-2">
          {navigation.map(({ label, icon: Icon }) => {
            const active = activeTab === label;

            return (
              <button
                key={label}
                onClick={() => {
                  setActiveTab(label);
                  setSearch('');
                  setMenuOpen(false);
                  setActionMessage('');
                  setError('');
                }}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition ${
                  active
                    ? 'border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200/70'
                    : 'border-transparent text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={15} />}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto">
          <div className="mb-4 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-4">
            <Sparkles size={20} className="mb-3 text-blue-600" />
            <p className="text-sm font-semibold">Your workspace</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Manage appointments, clients and consultation enquiries.
            </p>
          </div>

          <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-blue-50/70 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 font-bold text-white">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Administrator</p>
              <p className="text-xs text-slate-500">Signed in</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="relative min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-2xl sm:px-8">
          <button
            className="rounded-xl border border-slate-200 bg-white p-2.5 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={19} />
          </button>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Admin workspace / {activeTab}
            </p>
            <h1 className="mt-1 truncate text-xl font-semibold sm:text-2xl">
              {activeTab === 'Dashboard' ? 'Good to see you again' : activeTab}
            </h1>
          </div>

          <div className="relative hidden sm:block">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search records..."
              aria-label="Search records"
              className="w-44 rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-blue-400 lg:w-60"
            />
          </div>

          <button
            aria-label="Open enquiries"
            title="Open enquiries"
            onClick={() => {
              setActiveTab('Enquiries');
              setSearch('');
            }}
            className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-blue-50"
          >
            <Bell size={18} />
          </button>
        </header>

        <div className="mx-auto max-w-[1600px] p-5 sm:p-8 lg:p-10">
          {(error || actionMessage) && (
            <div
              className={`mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 text-sm ${
                error
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}
            >
              <span className="flex items-center gap-2">
                {error ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                {error || actionMessage}
              </span>
              <button
                onClick={() => {
                  setError('');
                  setActionMessage('');
                }}
                className="font-medium underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="mb-6 flex justify-end">
            <button
              disabled={dataLoading}
              onClick={() => void loadTab(activeTab)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm hover:bg-blue-50 disabled:opacity-50"
            >
              <RefreshCw size={15} className={dataLoading ? 'animate-spin' : ''} />
              Refresh records
            </button>
          </div>

          {dataLoading && (
            <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
              Loading live database records...
            </div>
          )}

          {activeTab === 'Dashboard' && (
            <>
              <section className="relative mb-8 overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 shadow-2xl shadow-blue-100/70 sm:p-9">
                <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-blue-100 blur-3xl" />
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
                      Review incoming enquiries, monitor bookings and keep
                      client consultations organised in one place.
                    </p>
                    <button
                      onClick={() => setActiveTab('Appointments')}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:-translate-y-0.5"
                    >
                      View appointments <ArrowUpRight size={17} />
                    </button>
                  </div>

                  <div className="relative mx-auto flex h-44 w-44 shrink-0 items-center justify-center md:mr-6 lg:h-52 lg:w-52">
                    <div className="absolute inset-0 rounded-full border border-blue-200" />
                    <div className="absolute inset-4 rounded-full border border-indigo-200" />
                    <div className="absolute inset-8 rounded-full border border-violet-200" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-[30px] border border-blue-200 bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 shadow-xl [transform:rotate(-8deg)]">
                      <Sun size={43} strokeWidth={1.2} className="text-blue-700" />
                    </div>
                  </div>
                </div>
              </section>

              <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, detail, icon: Icon, color }, index) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-5 shadow-xl shadow-slate-200/60 transition hover:-translate-y-1 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-600">{label}</p>
                        <p className="mt-4 text-4xl font-semibold text-slate-900">
                          {value}
                        </p>
                      </div>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
                        <Icon size={21} className="text-white" />
                      </div>
                    </div>
                    <div className="mt-5 flex justify-between border-t border-slate-200 pt-4">
                      <span className="text-xs text-slate-500">{detail}</span>
                      <span className="text-xs text-slate-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <CalendarDays size={20} className="text-blue-600" />
                        <h3 className="font-semibold">Upcoming consultations</h3>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        Scheduled appointments from your database
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('Appointments')}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      View all →
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {upcomingBookings.length ? (
                      upcomingBookings.map((item, index) => (
                        <div
                          key={getValue(item, 'id', 'booking_id') === '—'
                            ? index
                            : getValue(item, 'id', 'booking_id')}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-blue-50/50 p-4"
                        >
                          <div>
                            <p className="font-medium">
                              {getValue(item, 'name', 'client_name')}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {formatDate(getValue(item, 'selected_slot', 'selectedSlot', 'booking_date'))}
                            </p>
                          </div>
                          <span className={`rounded-full border px-3 py-1 text-xs ${statusClass(getValue(item, 'booking_status', 'status'))}`}>
                            {getValue(item, 'booking_status', 'status')}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 bg-blue-50/50 px-5 py-10 text-center">
                        <CalendarDays size={30} className="mx-auto mb-3 text-blue-500" />
                        <p className="text-sm font-medium">No upcoming consultations returned</p>
                        <p className="mt-2 text-xs text-slate-500">
                          Refresh the dashboard or open appointments to review records.
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-violet-100 p-2 text-violet-600">
                      <Activity size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Workspace activity</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Shortcuts to your records
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {[
                      { title: 'Client management', desc: 'View client contact details', icon: Users, tab: 'Clients' },
                      { title: 'Enquiry inbox', desc: 'Review and update enquiries', icon: Inbox, tab: 'Enquiries' },
                      { title: 'Appointments', desc: 'Review bookings and payments', icon: CircleDollarSign, tab: 'Appointments' },
                    ].map(({ title, desc, icon: Icon, tab }) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-blue-50/50 p-3.5 text-left transition hover:border-blue-200 hover:bg-blue-50"
                      >
                        <Icon size={19} className="text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{title}</p>
                          <p className="mt-1 text-xs text-slate-500">{desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-400" />
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}

          {activeTab === 'Enquiries' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Consultation enquiries</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review website submissions and update their status.
                </p>
              </div>

              {filteredEnquiries.length === 0 ? (
                <p className="rounded-xl bg-blue-50 p-8 text-center text-sm text-slate-500">
                  {dataLoading ? 'Loading enquiries...' : 'No matching enquiries found.'}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                        <th className="p-3">Client</th>
                        <th className="p-3">Property</th>
                        <th className="p-3">Received</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Update status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnquiries.map((item, index) => {
                        const id = getValue(item, 'id', 'enquiry_id');
                        const status = String(getValue(item, 'enquiry_status', 'status'));
                        return (
                          <tr key={id === '—' ? index : id} className="border-b border-slate-100 align-top hover:bg-blue-50/40">
                            <td className="p-3">
                              <p className="font-medium">{getValue(item, 'name')}</p>
                              <p className="mt-1 text-xs text-slate-500">{getValue(item, 'contact', 'phone', 'email')}</p>
                            </td>
                            <td className="p-3">
                              <p>{getValue(item, 'propertyType', 'property_type', 'propertyType')}</p>
                              <p className="mt-1 max-w-52 text-xs text-slate-500">{getValue(item, 'location', 'property_location')}</p>
                            </td>
                            <td className="p-3 text-xs text-slate-500">
                              {formatDate(getValue(item, 'created_at', 'createdAt'))}
                            </td>
                            <td className="p-3">
                              <span className={`rounded-full border px-2.5 py-1 text-xs ${statusClass(status)}`}>{status}</span>
                            </td>
                            <td className="p-3">
                              <select
                                value={status === '—' ? 'new' : status}
                                disabled={busyId === String(id)}
                                onChange={(event) => void updateEnquiry(item, event.target.value)}
                                className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs outline-none focus:border-blue-400"
                              >
                                {['new', 'contacted', 'in_progress', 'converted', 'closed'].map((option) => (
                                  <option key={option} value={option}>{option.replace('_', ' ')}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {activeTab === 'Clients' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
              <h2 className="text-xl font-semibold">Clients</h2>
              <p className="mb-6 mt-1 text-sm text-slate-500">
                Client contact information from your database.
              </p>

              {filteredClients.length === 0 ? (
                <p className="rounded-xl bg-blue-50 p-8 text-center text-sm text-slate-500">
                  {dataLoading ? 'Loading clients...' : 'No matching clients found.'}
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredClients.map((item, index) => {
                    const id = getValue(item, 'id', 'client_id');
                    return (
                      <article key={id === '—' ? index : id} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-5 transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 font-semibold text-white">
                            {String(getValue(item, 'name')).charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate font-semibold">{getValue(item, 'name')}</h3>
                            <p className="text-xs text-slate-500">Client record</p>
                          </div>
                        </div>
                        <p className="flex items-start gap-2 break-all text-sm text-slate-600">
                          <Phone size={15} className="mt-0.5 shrink-0 text-blue-600" />
                          {getValue(item, 'contact', 'phone')}
                        </p>
                        <p className="mt-3 flex items-start gap-2 break-all text-sm text-slate-600">
                          <Mail size={15} className="mt-0.5 shrink-0 text-blue-600" />
                          {getValue(item, 'email')}
                        </p>
                        <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                          <MapPin size={15} className="mt-0.5 shrink-0 text-blue-600" />
                          {getValue(item, 'location', 'property_location')}
                        </p>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {activeTab === 'Appointments' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Appointments & payments</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review bookings, verify received payments and manage appointment status.
                </p>
              </div>

              {filteredBookings.length === 0 ? (
                <p className="rounded-xl bg-blue-50 p-8 text-center text-sm text-slate-500">
                  {dataLoading ? 'Loading appointments...' : 'No matching bookings found.'}
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((item, index) => {
                    const id = getValue(item, 'id', 'booking_id');
                    const bookingStatus = String(getValue(item, 'booking_status', 'status'));
                    const paymentStatus = String(getValue(item, 'payment_status'));
                    const isBusy = busyId === String(id);

                    return (
                      <article key={id === '—' ? index : id} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/70 p-5">
                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold">
                              {getValue(item, 'name', 'client_name')}
                            </h3>
                            <p className="mt-1 break-all text-sm text-slate-500">
                              {getValue(item, 'contact', 'phone', 'email')}
                            </p>
                            <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                              <CalendarDays size={16} className="text-blue-600" />
                              {formatDate(getValue(item, 'selected_slot', 'selectedSlot', 'booking_date', 'bookingDate'))}
                            </p>
                            <p className="mt-2 text-sm text-slate-600">
                              Amount: {getValue(item, 'amount', 'price', 'payment_amount')}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <span className={`rounded-full border px-3 py-1 text-xs ${statusClass(bookingStatus)}`}>
                              Booking: {bookingStatus}
                            </span>
                            <span className={`rounded-full border px-3 py-1 text-xs ${statusClass(paymentStatus)}`}>
                              Payment: {paymentStatus}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                          {paymentStatus.toLowerCase() !== 'verified' && (
                            <button
                              disabled={isBusy}
                              onClick={() => void verifyPayment(item)}
                              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                            >
                              <CheckCircle2 size={14} className="mr-1 inline" />
                              Verify payment
                            </button>
                          )}

                          {bookingStatus.toLowerCase() !== 'confirmed' &&
                            bookingStatus.toLowerCase() !== 'cancelled' &&
                            bookingStatus.toLowerCase() !== 'canceled' && (
                              <button
                                disabled={isBusy || paymentStatus.toLowerCase() !== 'verified'}
                                title={paymentStatus.toLowerCase() !== 'verified' ? 'Verify payment first' : 'Confirm booking'}
                                onClick={() => void updateBooking(item, 'confirm')}
                                className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-xs font-medium text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Confirm appointment
                              </button>
                            )}

                          {bookingStatus.toLowerCase() === 'confirmed' && (
                            <button
                              disabled={isBusy}
                              onClick={() => void updateBooking(item, 'complete')}
                              className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-50"
                            >
                              Mark completed
                            </button>
                          )}

                          {!['cancelled', 'canceled', 'completed'].includes(bookingStatus.toLowerCase()) && (
                            <button
                              disabled={isBusy}
                              onClick={() => void updateBooking(item, 'cancel')}
                              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                            >
                              <XCircle size={14} className="mr-1 inline" />
                              Cancel booking
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {activeTab === 'Packages' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
              <Package size={28} className="mb-4 text-blue-600" />
              <h2 className="text-2xl font-semibold">Consultation packages</h2>
              <p className="mt-2 text-sm text-slate-600">
                Package editing is not connected to the admin API yet. These are your current website package prices.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { name: 'Gold', price: '₹2,50,000' },
                  { name: 'Silver', price: '₹1,50,000' },
                  { name: 'Bronze', price: '₹80,000' },
                  { name: 'Basic', price: '₹30,000–₹50,000' },
                ].map((item) => (
                  <div key={item.name} className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-5">
                    <p className="text-sm text-slate-500">{item.name}</p>
                    <p className="mt-2 text-xl font-semibold">{item.price}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'Settings' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
              <Settings size={28} className="mb-4 text-blue-600" />
              <h2 className="text-2xl font-semibold">Workspace settings</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your admin session is protected by the existing login API. Account and password changes are not connected to this page.
              </p>
              <button
                onClick={handleLogout}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white"
              >
                <LogOut size={16} /> Sign out
              </button>
            </section>
          )}

          <p className="mt-8 text-center text-[10px] tracking-wide text-slate-400">
            ACHARYA SUNIL MAHATMA · ADMIN WORKSPACE
          </p>
        </div>
      </main>
    </div>
  );
}
