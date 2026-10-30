import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ApproachSection from '@/components/sections/ApproachSection';
import SevenLayersSection from '@/components/sections/SevenLayersSection';
import PackagesSection from '@/components/sections/PackagesSection';
import ConsultationSection from '@/components/sections/ConsultationSection';
import EnquireSection from '@/components/sections/EnquireSection';

import AdminDashboard from '@/components/sections/AdminDashboard';

function HomePage() {
  return (
    <div className="min-h-screen bg-ivory-50 font-sans text-ink-700 antialiased">
      <Navbar />
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
        <Route path="/" element={<HomePage />} />

        {/* Your renamed admin login page */}
        <Route path="/admin/login" element={<AdminDashboard />} />

        {/* Redirect /admin to the login page for now */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/login" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;