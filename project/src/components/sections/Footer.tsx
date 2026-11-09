
import {
  Instagram,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  MapPin,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="maha-footer">
      <div className="footer-gold-line" />

      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            <img
              src="/logoo.png"
              alt="Mahavastu logo"
              className="footer-logo-image"
            />
            <div>
              <h2>Acharya Sunil Mahatma</h2>
              <span>ASTRO VASTU · ASTROLOGY</span>
            </div>
          </a>

          <p className="footer-description">
            Bringing together Astro Vastu, astrology and numerology
            to help you understand your space and find a considered path
            forward.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/Acharyasunilmahatma.26/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="footer-social-link"
            >
              <Instagram size={19} />
            </a>

            <a
              href="https://wa.me/91 9377740464"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="footer-social-link"
            >
              <MessageCircle size={19} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h3>EXPLORE</h3>
          <a href="#approach">Our Approach</a>
          <a href="#seven-layers">Seven Layers</a>
          <a href="#packages">Packages</a>
          <a href="#consultation">Consultation</a>
          <a href="#consultation-enquiry">Enquire Now</a>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h3>OUR EXPERTISE</h3>
          <a href="#approach">Astro Vastu</a>
          <a href="#approach">Astrology</a>
          <a href="#approach">Numerology</a>
          <a href="#approach">Personal Consultation</a>
          <a href="#approach">Palmist</a>
        </div>

        {/* Contact */}
        <div className="footer-column footer-contact">
          <h3>CONNECT WITH US</h3>

          <p>
            <Sparkles size={16} />
            Personalised guidance for your space
          </p>

          <p>
            <MessageCircle size={16} />
            WhatsApp: +91 93777 40464
          </p>

          <a
            href="https://wa.me/91 9377740464"
            target="_blank"
            rel="noreferrer"
            className="footer-cta"
          >
            Start an Enquiry
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {currentYear} Acharya Sunil Mahatma. All rights reserved.</p>

        <a href="#hero" className="footer-back-top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
