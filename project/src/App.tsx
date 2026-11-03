
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar, { MovingExpertiseBar } from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ApproachSection from '@/components/sections/ApproachSection';
import SevenLayersSection from '@/components/sections/SevenLayersSection';
import PackagesSection from '@/components/sections/PackagesSection';
import ConsultationSection from '@/components/sections/ConsultationSection';
import EnquireSection from '@/components/sections/EnquireSection';
import Footer from '@/components/sections/Footer';

import AdminDashboard from '@/components/sections/AdminDashboard';
import AdminHome from '@/components/sections/AdminHome';



function HomePage() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(2, 35, 27, 0.45),
            rgba(2, 35, 27, 0.65)
          ),
          url("/hp.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
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

      <Footer />
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/admin/login" element={<AdminDashboard />} />

        <Route path="/admin/dashboard" element={<AdminHome />} />

        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
