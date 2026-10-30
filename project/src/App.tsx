
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar, { MovingExpertiseBar } from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ApproachSection from '@/components/sections/ApproachSection';
import SevenLayersSection from '@/components/sections/SevenLayersSection';
import PackagesSection from '@/components/sections/PackagesSection';
import ConsultationSection from '@/components/sections/ConsultationSection';
import EnquireSection from '@/components/sections/EnquireSection';

import AdminDashboard from '@/components/sections/AdminDashboard';
import AdminHome from '@/components/sections/AdminHome';

function HomePage() {
  return (
    <div className="min-h-screen bg-ivory-50 font-sans text-ink-700 antialiased">
      <Navbar />
      <MovingExpertiseBar />
      <main>
        <HeroSection />
        <ApproachSection />
        <SevenLayersSection />
        <PackagesSection />
        <ConsultationSection />
        <EnquireSection />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website */}
        <Route path="/" element={<HomePage />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminDashboard />} />

        {/* Admin dashboard */}
        <Route path="/admin/dashboard" element={<AdminHome />} />

        {/* Redirect /admin to the dashboard */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;