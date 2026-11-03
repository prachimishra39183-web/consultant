
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

const GOLD = '#B18B50';

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
    return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  }

  if (['cancelled', 'canceled', 'closed', 'rejected'].includes(value)) {
    return 'border-red-200 bg-red-50 text-red-800';
  }

  if (['contacted', 'in_progress', 'pending', 'new'].includes(value)) {
    return 'border-amber-300 bg-amber-50 text-black';
  }

  return 'border-[#d8c18f] bg-[#faf3e4] text-black';
};

const panel =
  'rounded-2xl border border-[#e1d1ae] bg-white shadow-[0_8px_28px_rgba(80,60,25,0.06)]';

const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-[#a47c3c] bg-gradient-to-r from-[#c5a365] to-[#e4cd98] px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50';

const secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-[#ddceb0] bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#faf3e4] disabled:opacity-50';

const fieldClass =
  'w-full rounded-xl border border-[#ddceb0] bg-[#fffdf8] px-3 py-2.5 text-sm text-black outline-none placeholder:text-[#777064] focus:border-[#b18b50] focus:ring-2 focus:ring-[#b18b50]/20';

function StatusBadge({ value }: { value: unknown }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusClass(value)}`}>
      {String(value || 'Unknown')}
    </span>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-black">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-[#625b4e]">{description}</p>
    </div>
  );
}

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
          headers: body ? { 'Content-Type': 'application/json' } : undefined,
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

    void verifySession();

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

    if (
      !window.confirm(
        'Have you independently confirmed that the payment was received?'
      )
    ) {
      return;
    }

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
      `Appointment ${
        action === 'confirm'
          ? 'confirmed'
          : action === 'cancel'
            ? 'cancelled'
            : 'updated'
      }.`,
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
          getValue(item, 'name', 'full_name'),
          getValue(item, 'contact', 'phone', 'email'),
          getValue(item, 'location', 'property_location'),
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
    },
    {
      label: 'Confirmed Sessions',
      value: dashboard?.stats?.confirmedBookings ?? '—',
      detail: 'Confirmed appointments',
      icon: CalendarDays,
    },
    {
      label: 'Upcoming',
      value: dashboard?.upcomingBookings?.length ?? '—',
      detail: 'Scheduled sessions',
      icon: Clock,
    },
    {
      label: 'New Enquiries',
      value: dashboard?.stats?.newEnquiries ?? '—',
      detail: 'Awaiting follow-up',
      icon: Inbox,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f5ed] text-black">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#e8d8b5] border-t-[#b18b50]" />
          <p className="text-sm">Securing your workspace...</p>
        </div>
      </div>
    );
  }

  const upcomingBookings: RecordData[] = dashboard?.upcomingBookings || [];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f5ed] text-black md:flex">
      {/* Subtle gold background accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#ead9b4]/35 blur-[110px]" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-[#f0e5ce]/55 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#e4cf9e]/25 blur-[110px]" />
      </div>

      {menuOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[265px] flex-col border-r border-[#dfcfad] bg-[#fffdf8] p-5 shadow-xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-10 flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#b18b50] bg-gradient-to-br from-[#d9bf86] to-[#f4e7c9] shadow-md">
              <Sun size={23} className="text-black" />
            </div>

            <div>
              <p className="font-serif text-lg font-semibold text-black">
                Acharya Sunil
              </p>
              <p className="mt-0.5 text-[10px] font-bold tracking-[0.24em] text-[#8b682f]">
                ADMIN STUDIO
              </p>
            </div>
          </div>

          <button
            className="text-black md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#766b58]">
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
                    ? 'border-[#b18b50] bg-gradient-to-r from-[#d9bf86] to-[#f0dfb6] font-semibold text-black shadow-sm'
                    : 'border-transparent text-black hover:border-[#dfcfad] hover:bg-[#faf3e4]'
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
          <div className="mb-4 rounded-2xl border border-[#e0cfaa] bg-gradient-to-br from-[#fff9e9] to-[#f1e1bd] p-4">
            <Sparkles size={20} className="mb-3 text-[#8b682f]" />
            <p className="text-sm font-semibold text-black">Your workspace</p>
            <p className="mt-1 text-xs leading-5 text-[#625b4e]">
              Manage appointments, clients and consultation enquiries.
            </p>
          </div>

          <div className="mb-4 flex items-center gap-3 rounded-xl border border-[#e1d4bb] bg-white p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b18b50] bg-gradient-to-br from-[#c5a365] to-[#f0dfb6] font-bold text-black">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-black">Administrator</p>
              <p className="text-xs text-[#766b58]">Signed in</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-black transition hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="relative min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#dfcfad] bg-[#fffdf8]/95 px-4 py-4 backdrop-blur-xl sm:gap-4 sm:px-8">
          <button
            className="rounded-xl border border-[#dfcfad] bg-white p-2.5 text-black md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={19} />
          </button>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#766b58] sm:tracking-[0.2em]">
              Admin workspace / {activeTab}
            </p>
            <h1 className="mt-1 truncate text-xl font-semibold text-black sm:text-2xl">
              {activeTab === 'Dashboard' ? 'Good to see you again' : activeTab}
            </h1>
          </div>

          <div className="relative hidden sm:block">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#766b58]"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search records..."
              aria-label="Search records"
              className={`${fieldClass} w-44 py-2.5 pl-9 text-xs lg:w-60`}
            />
          </div>

          <button
            aria-label="Open enquiries"
            title="Open enquiries"
            onClick={() => {
              setActiveTab('Enquiries');
              setSearch('');
            }}
            className="relative rounded-xl border border-[#dfcfad] bg-white p-2.5 text-black transition hover:bg-[#faf3e4]"
          >
            <Bell size={18} />
          </button>
        </header>

        <div className="mx-auto max-w-[1600px] p-4 sm:p-8 lg:p-10">
          {/* Mobile search */}
          <div className="relative mb-5 sm:hidden">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#766b58]"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search records..."
              aria-label="Search records"
              className={`${fieldClass} pl-9`}
            />
          </div>

          {(error || actionMessage) && (
            <div
              className={`mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 text-sm ${
                error
                  ? 'border-red-200 bg-red-50 text-red-800'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-800'
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
              className={secondaryButton}
            >
              <RefreshCw size={15} className={dataLoading ? 'animate-spin' : ''} />
              Refresh records
            </button>
          </div>

          {dataLoading && (
            <div className="mb-5 rounded-xl border border-[#e0cfaa] bg-[#fff8e8] p-3 text-sm text-black">
              Loading live database records...
            </div>
          )}

          {/* Dashboard */}
          {activeTab === 'Dashboard' && (
            <>
              <section className="relative mb-8 overflow-hidden rounded-3xl border border-[#d9c397] bg-gradient-to-br from-[#fffdf7] via-[#fbf3e2] to-[#ead5a6] p-6 shadow-[0_18px_45px_rgba(80,60,25,0.09)] sm:p-9">
                <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-[#d8c18f]/40 blur-3xl" />

                <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div className="max-w-xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d1b77f] bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-black">
                      <Sparkles size={13} />
                      Your control center
                    </div>

                    <h2 className="font-serif text-3xl font-medium leading-tight text-black sm:text-4xl lg:text-5xl">
                      Clarity for every
                      <span className="block text-[#987237]">
                        consultation.
                      </span>
                    </h2>

                    <p className="mt-4 max-w-lg text-sm leading-6 text-[#554d40]">
                      Review incoming enquiries, monitor bookings and keep
                      client consultations organised in one place.
                    </p>

                    <button
                      onClick={() => setActiveTab('Appointments')}
                      className={`${primaryButton} mt-6`}
                    >
                      View appointments <ArrowUpRight size={17} />
                    </button>
                  </div>

                  <div className="relative mx-auto flex h-44 w-44 shrink-0 items-center justify-center md:mr-6 lg:h-52 lg:w-52">
                    <div className="absolute inset-0 rounded-full border border-[#c8a86b]" />
                    <div className="absolute inset-4 rounded-full border border-[#d8c18f]" />
                    <div className="absolute inset-8 rounded-full border border-[#b18b50]/70" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-[30px] border border-[#b18b50] bg-gradient-to-br from-[#e8d4a6] to-[#fff8e8] shadow-lg [transform:rotate(-8deg)]">
                      <Sun size={43} strokeWidth={1.2} className="text-black" />
                    </div>
                  </div>
                </div>
              </section>

              <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, detail, icon: Icon }, index) => (
                  <div
                    key={label}
                    className={`${panel} p-5 transition hover:-translate-y-1 hover:shadow-lg sm:p-6`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-[#625b4e]">{label}</p>
                        <p className="mt-4 text-4xl font-semibold text-black">
                          {value}
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d5bd8b] bg-gradient-to-br from-[#f4e7c9] to-[#dfc48b]">
                        <Icon size={21} className="text-black" />
                      </div>
                    </div>

                    <div className="mt-5 flex justify-between border-t border-[#eee4d1] pt-4">
                      <span className="text-xs text-[#625b4e]">{detail}</span>
                      <span className="text-xs text-[#9b7a43]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <section className={`${panel} p-5 sm:p-7`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <CalendarDays size={20} className="text-[#987237]" />
                        <h3 className="font-semibold text-black">
                          Upcoming consultations
                        </h3>
                      </div>
                      <p className="mt-2 text-xs text-[#625b4e]">
                        Scheduled appointments from your database
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('Appointments')}
                      className="text-xs font-medium text-[#8b682f] hover:underline"
                    >
                      View all →
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {upcomingBookings.length ? (
                      upcomingBookings.map((item, index) => (
                        <div
                          key={
                            getValue(item, 'id', 'booking_id') === '—'
                              ? index
                              : getValue(item, 'id', 'booking_id')
                          }
                          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e7dcc6] bg-[#fffdf8] p-4"
                        >
                          <div>
                            <p className="font-medium text-black">
                              {getValue(item, 'name', 'client_name')}
                            </p>
                            <p className="mt-1 text-xs text-[#625b4e]">
                              {formatDate(
                                getValue(
                                  item,
                                  'selected_slot',
                                  'selectedSlot',
                                  'booking_date'
                                )
                              )}
                            </p>
                          </div>
                          <StatusBadge
                            value={getValue(item, 'booking_status', 'status')}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-[#d8c8a7] bg-[#fffdf8] px-5 py-10 text-center">
                        <CalendarDays
                          size={30}
                          className="mx-auto mb-3 text-[#987237]"
                        />
                        <p className="text-sm font-medium text-black">
                          No upcoming consultations returned
                        </p>
                        <p className="mt-2 text-xs text-[#625b4e]">
                          Refresh the dashboard or open appointments to review
                          records.
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <section className={`${panel} p-5 sm:p-7`}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-[#e0cfaa] bg-[#faf3e4] p-2 text-[#8b682f]">
                      <Activity size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">
                        Workspace activity
                      </h3>
                      <p className="mt-1 text-xs text-[#625b4e]">
                        Shortcuts to your records
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      {
                        title: 'Client management',
                        desc: 'View client contact details',
                        icon: Users,
                        tab: 'Clients',
                      },
                      {
                        title: 'Enquiry inbox',
                        desc: 'Review and update enquiries',
                        icon: Inbox,
                        tab: 'Enquiries',
                      },
                      {
                        title: 'Appointments',
                        desc: 'Review bookings and payments',
                        icon: CircleDollarSign,
                        tab: 'Appointments',
                      },
                    ].map(({ title, desc, icon: Icon, tab }) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="flex w-full items-center gap-3 rounded-xl border border-[#e7dcc6] bg-[#fffdf8] p-3.5 text-left transition hover:border-[#c6a76e] hover:bg-[#faf3e4]"
                      >
                        <Icon size={19} className="text-[#987237]" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-black">
                            {title}
                          </p>
                          <p className="mt-1 text-xs text-[#625b4e]">
                            {desc}
                          </p>
                        </div>
                        <ChevronRight size={16} className="text-[#8b682f]" />
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}

          {/* Enquiries */}
          {activeTab === 'Enquiries' && (
            <section className={`${panel} p-5 sm:p-7`}>
              <SectionHeading
                title="Consultation enquiries"
                description="Review website submissions and update their status."
              />

              {filteredEnquiries.length === 0 ? (
                <p className="rounded-xl bg-[#faf3e4] p-8 text-center text-sm text-[#625b4e]">
                  {dataLoading
                    ? 'Loading enquiries...'
                    : 'No matching enquiries found.'}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#e5d9c2] text-xs uppercase tracking-wide text-[#625b4e]">
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
                        const status = String(
                          getValue(item, 'enquiry_status', 'status')
                        );

                        return (
                          <tr
                            key={id === '—' ? index : id}
                            className="border-b border-[#f0e8d9] align-top transition hover:bg-[#fffaf0]"
                          >
                            <td className="p-3">
                              <p className="font-medium text-black">
                                {getValue(item, 'name', 'full_name')}
                              </p>
                              <p className="mt-1 text-xs text-[#625b4e]">
                                {getValue(
                                  item,
                                  'contact',
                                  'phone',
                                  'email',
                                  'phone_or_email'
                                )}
                              </p>
                            </td>
                            <td className="p-3 text-black">
                              <p>
                                {getValue(item, 'propertyType', 'property_type')}
                              </p>
                              <p className="mt-1 max-w-52 text-xs text-[#625b4e]">
                                {getValue(item, 'location', 'property_location')}
                              </p>
                            </td>
                            <td className="p-3 text-xs text-[#625b4e]">
                              {formatDate(
                                getValue(item, 'created_at', 'createdAt')
                              )}
                            </td>
                            <td className="p-3">
                              <StatusBadge value={status} />
                            </td>
                            <td className="p-3">
                              <select
                                value={status === '—' ? 'new' : status}
                                disabled={busyId === String(id)}
                                onChange={(event) =>
                                  void updateEnquiry(item, event.target.value)
                                }
                                className={`${fieldClass} max-w-44 py-2 text-xs`}
                              >
                                {[
                                  'new',
                                  'contacted',
                                  'in_progress',
                                  'converted',
                                  'closed',
                                ].map((option) => (
                                  <option key={option} value={option}>
                                    {option.replace('_', ' ')}
                                  </option>
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

          {/* Clients */}
          {activeTab === 'Clients' && (
            <section className={`${panel} p-5 sm:p-7`}>
              <SectionHeading
                title="Clients"
                description="Client contact information from your database."
              />

              {filteredClients.length === 0 ? (
                <p className="rounded-xl bg-[#faf3e4] p-8 text-center text-sm text-[#625b4e]">
                  {dataLoading
                    ? 'Loading clients...'
                    : 'No matching clients found.'}
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredClients.map((item, index) => {
                    const id = getValue(item, 'id', 'client_id');

                    return (
                      <article
                        key={id === '—' ? index : id}
                        className="rounded-2xl border border-[#e1d4bb] bg-gradient-to-br from-white to-[#fff9ed] p-5 transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d5bd8b] bg-gradient-to-br from-[#e7d3a5] to-[#f7edda] font-semibold text-black">
                            {String(getValue(item, 'name', 'full_name'))
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate font-semibold text-black">
                              {getValue(item, 'name', 'full_name')}
                            </h3>
                            <p className="text-xs text-[#625b4e]">
                              Client record
                            </p>
                          </div>
                        </div>

                        <p className="flex items-start gap-2 break-all text-sm text-black">
                          <Phone
                            size={15}
                            className="mt-0.5 shrink-0 text-[#987237]"
                          />
                          {getValue(item, 'contact', 'phone')}
                        </p>

                        <p className="mt-3 flex items-start gap-2 break-all text-sm text-black">
                          <Mail
                            size={15}
                            className="mt-0.5 shrink-0 text-[#987237]"
                          />
                          {getValue(item, 'email')}
                        </p>

                        <p className="mt-3 flex items-start gap-2 text-sm text-black">
                          <MapPin
                            size={15}
                            className="mt-0.5 shrink-0 text-[#987237]"
                          />
                          {getValue(item, 'location', 'property_location')}
                        </p>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* Appointments */}
          {activeTab === 'Appointments' && (
            <section className={`${panel} p-5 sm:p-7`}>
              <SectionHeading
                title="Appointments & payments"
                description="Review bookings, verify received payments and manage appointment status."
              />

              {filteredBookings.length === 0 ? (
                <p className="rounded-xl bg-[#faf3e4] p-8 text-center text-sm text-[#625b4e]">
                  {dataLoading
                    ? 'Loading appointments...'
                    : 'No matching bookings found.'}
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((item, index) => {
                    const id = getValue(item, 'id', 'booking_id');
                    const bookingStatus = String(
                      getValue(item, 'booking_status', 'status')
                    );
                    const paymentStatus = String(
                      getValue(item, 'payment_status', 'paymentStatus')
                    );
                    const isBusy = busyId === String(id);

                    return (
                      <article
                        key={id === '—' ? index : id}
                        className="rounded-2xl border border-[#e1d4bb] bg-gradient-to-br from-white to-[#fffaf0] p-5"
                      >
                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-black">
                              {getValue(item, 'name', 'client_name')}
                            </h3>
                            <p className="mt-1 break-all text-sm text-[#625b4e]">
                              {getValue(item, 'contact', 'phone', 'email')}
                            </p>
                            <p className="mt-3 flex items-center gap-2 text-sm text-black">
                              <CalendarDays
                                size={16}
                                className="text-[#987237]"
                              />
                              {formatDate(
                                getValue(
                                  item,
                                  'selected_slot',
                                  'selectedSlot',
                                  'booking_date',
                                  'bookingDate'
                                )
                              )}
                            </p>
                            <p className="mt-2 text-sm text-black">
                              Amount:{' '}
                              {getValue(item, 'amount', 'price', 'payment_amount')}
                            </p>
                            {getValue(item, 'payment_reference', 'paymentReference') !== '—' && (
                              <p className="mt-2 break-all text-xs text-[#625b4e]">
                                Payment reference:{' '}
                                {getValue(item, 'payment_reference', 'paymentReference')}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <StatusBadge value={`Booking: ${bookingStatus}`} />
                            <StatusBadge value={`Payment: ${paymentStatus}`} />
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2 border-t border-[#e9dfcd] pt-4">
                          {paymentStatus.toLowerCase() !== 'verified' && (
                            <button
                              disabled={isBusy}
                              onClick={() => void verifyPayment(item)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 hover:bg-emerald-100 disabled:opacity-50"
                            >
                              <CheckCircle2 size={14} />
                              Verify payment
                            </button>
                          )}

                          {bookingStatus.toLowerCase() !== 'confirmed' &&
                            bookingStatus.toLowerCase() !== 'cancelled' &&
                            bookingStatus.toLowerCase() !== 'canceled' &&
                            bookingStatus.toLowerCase() !== 'completed' && (
                              <button
                                disabled={
                                  isBusy ||
                                  paymentStatus.toLowerCase() !== 'verified'
                                }
                                title={
                                  paymentStatus.toLowerCase() !== 'verified'
                                    ? 'Verify payment first'
                                    : 'Confirm booking'
                                }
                                onClick={() => void updateBooking(item, 'confirm')}
                                className={primaryButton}
                              >
                                Confirm appointment
                              </button>
                            )}

                          {bookingStatus.toLowerCase() === 'confirmed' && (
                            <button
                              disabled={isBusy}
                              onClick={() => void updateBooking(item, 'complete')}
                              className={secondaryButton}
                            >
                              Mark completed
                            </button>
                          )}

                          {![
                            'cancelled',
                            'canceled',
                            'completed',
                          ].includes(bookingStatus.toLowerCase()) && (
                            <button
                              disabled={isBusy}
                              onClick={() => void updateBooking(item, 'cancel')}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-800 hover:bg-red-100 disabled:opacity-50"
                            >
                              <XCircle size={14} />
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

          {/* Packages */}
          {activeTab === 'Packages' && (
            <section className={`${panel} p-6 sm:p-8`}>
              <Package size={28} className="mb-4 text-[#987237]" />
              <SectionHeading
                title="Consultation packages"
                description="Current website package prices."
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { name: 'Gold', price: '₹2,50,000' },
                  { name: 'Silver', price: '₹1,50,000' },
                  { name: 'Bronze', price: '₹80,000' },
                  { name: 'Basic', price: '₹30,000–₹50,000' },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-[#ddc99e] bg-gradient-to-br from-white to-[#faf0d9] p-5 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <p className="text-sm font-medium text-[#625b4e]">
                      {item.name}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-black">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-5 text-[#625b4e]">
                Package editing is not connected to the admin API yet. Changes
                here require an API and database update before they can be saved.
              </p>
            </section>
          )}

          {/* Settings */}
          {activeTab === 'Settings' && (
            <section className={`${panel} p-6 sm:p-8`}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ddc99e] bg-[#faf0d9]">
                <Settings size={25} className="text-[#987237]" />
              </div>

              <SectionHeading
                title="Workspace settings"
                description="Manage your admin workspace session."
              />

              <div className="rounded-xl border border-[#e7dcc6] bg-[#fffaf0] p-4">
                <p className="text-sm font-medium text-black">
                  Session security
                </p>
                <p className="mt-1 text-sm leading-6 text-[#625b4e]">
                  Your admin session is protected by the existing login API.
                  Account and password changes are not connected to this page.
                </p>
              </div>

              <button onClick={handleLogout} className={`${primaryButton} mt-5`}>
                <LogOut size={16} />
                Sign out
              </button>
            </section>
          )}

          <p className="mt-8 text-center text-[10px] tracking-[0.18em] text-[#8a7b61]">
            ACHARYA SUNIL MAHATMA · ADMIN WORKSPACE
          </p>
        </div>
      </main>
    </div>
  );
}
