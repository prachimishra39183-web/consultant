import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';

const STATS = [
  { value: '7', label: 'Balancing layers' },
  { value: '4', label: 'Foundation steps' },
  { value: '7–10', label: 'Site visits' },
];

export default function HeroSection() {
  return (
    <section
      id="top"
      className="astro-hero relative isolate min-h-screen overflow-hidden px-5 pb-10 pt-20 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.45), rgba(255,255,255,0.45)), url("/bgi.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Ambient decorative shapes */}
      <div className="astro-hero-glow" aria-hidden="true" />
      <div className="astro-hero-grid" aria-hidden="true" />

      {/* Decorative celestial details */}
      <div className="astro-hero-emblem" aria-hidden="true">
        <div className="astro-emblem-ring astro-emblem-ring-one" />
        <div className="astro-emblem-ring astro-emblem-ring-two" />
      </div>

      <div className="astro-hero-watermark" aria-hidden="true">
        VASTU
      </div>

      <div className="astro-hero-inner mx-auto w-full max-w-[1400px]">
        {/* Top label */}
        <div className="astro-hero-eyebrow">
          <span className="astro-eyebrow-star">
            <Sparkles size={14} />
          </span>

          <span>MAHAVASTU CONSULTANT</span>

          <span className="astro-eyebrow-divider" />

          <span>CERTIFIED ACHARYA</span>
        </div>

        <div className="astro-hero-layout">
          {/* Left: editorial headline */}
          <div className="astro-hero-copy">
            <p className="astro-hero-overline">
              <span className="astro-overline-dot" />
              <span>A MORE HARMONIOUS WAY TO LIVE</span>
            </p>

            <h1 className="astro-hero-title">
              Your space.
              <br />
              <span className="astro-title-second">Your nature.</span>
              <br />
              <span className="astro-title-last">
                A considered path
                <span className="astro-title-period">.</span>
              </span>
            </h1>

            <div className="astro-title-ornament" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <p className="astro-hero-description">
              Personalised guidance with Acharya Sunil Mahatma,
              bringing Astro Vastu, astrology and numerology
              together around you and your space.
            </p>

            <div className="astro-hero-actions">
              <a
                href="#consultation-enquiry"
                className="astro-button astro-button-primary"
              >
                <span>Request a consultation</span>

                <span className="astro-button-icon">
                  <ArrowUpRight
                    size={17}
                    strokeWidth={2}
                    color="#e6d0a4"
                  />
                </span>
              </a>

              <a
                href="#seven-layers"
                className="astro-button astro-button-secondary"
              >
                <span>Explore the 7 layers</span>

                <span className="astro-secondary-arrow">
                  <ArrowDown
                    size={15}
                    strokeWidth={2}
                    color="#947341"
                  />
                </span>
              </a>
            </div>

            <div className="astro-hero-note">
              <span className="astro-note-line" />
              <span>Understand your space. Discover your balance.</span>
            </div>
          </div>

          {/* Right: portrait with dimensional celestial geometry */}
          <div className="astro-hero-visual">
            <div className="astro-visual-caption astro-caption-top">
              <span className="astro-caption-dot" />
              SPACE · ENERGY · ALIGNMENT
            </div>

            <div className="astro-portrait-composition">
              {/* Large 3D orbital rings */}
              <div className="astro-orbit astro-orbit-one" />
              <div className="astro-orbit astro-orbit-two" />
              <div className="astro-orbit astro-orbit-three" />

              {/* Sculptural rings */}
              <div className="astro-ring astro-ring-back" />
              <div className="astro-ring astro-ring-front" />

              {/* Soft ivory portrait frame */}
              <div className="astro-portrait-halo" />

              <div className="astro-portrait-frame">
                <img
                  src="/img0.jpg"
                  alt="Acharya Sunil Mahatma, Mahavastu consultant"
                  className="astro-portrait-image"
                  fetchPriority="high"
                />

                <div className="astro-portrait-shade" />

                <div className="astro-portrait-label">
                  <span className="astro-portrait-label-kicker">
                    YOUR GUIDE
                  </span>

                  <span className="astro-portrait-name">
                    Acharya Sunil Mahatma
                  </span>

                  <span className="astro-portrait-role">
                    Astro Vastu · Astrology · Numerology
                  </span>
                </div>
              </div>

              {/* Floating dimensional sphere */}
              <div className="astro-floating-sphere" aria-hidden="true">
                <div className="astro-sphere-core" />
                <div className="astro-sphere-latitude" />
                <div className="astro-sphere-longitude" />
              </div>

              {/* Floating geometry tile */}
              <div className="astro-floating-tile" aria-hidden="true">
                <div className="astro-tile-inner">
                  <svg viewBox="0 0 100 100" fill="none">
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="0.8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="23"
                      stroke="currentColor"
                      strokeWidth="0.8"
                    />
                    <path
                      d="M50 10 85 70 15 70 50 10Z"
                      stroke="currentColor"
                      strokeWidth="0.8"
                    />
                    <path
                      d="M50 90 15 30 85 30 50 90Z"
                      stroke="currentColor"
                      strokeWidth="0.8"
                    />
                    <circle cx="50" cy="50" r="4" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Small floating marker */}
              <div className="astro-floating-star" aria-hidden="true">
                ✳
              </div>
            </div>

            <div className="astro-visual-caption astro-caption-bottom">
              <span>01 /</span>
              <span>A PERSONAL APPROACH TO YOUR SPACE</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="astro-stats-section">
          <div className="astro-stats-heading">
            <span className="astro-stats-kicker">
              <span className="astro-stats-kicker-line" />
              THE FRAMEWORK
            </span>

            <p>Thoughtful guidance, structured around you.</p>
          </div>

          <div className="astro-stats-grid">
            {STATS.map((stat, index) => (
              <div
                className={`astro-stat-card astro-stat-card-${index + 1}`}
                key={stat.label}
                style={{ '--stat-index': index } as React.CSSProperties}
              >
                <div className="astro-stat-card-shine" />

                <div className="astro-stat-card-top">
                  <span className="astro-stat-index">
                    0{index + 1}
                  </span>

                  <span className="astro-stat-symbol">
                    {index === 0 ? '✳' : index === 1 ? '◇' : '◎'}
                  </span>
                </div>

                <div className="astro-stat-number-row">
                  <span className="astro-stat-value">{stat.value}</span>
                  <span className="astro-stat-orbit-dot" />
                </div>

                <span className="astro-stat-label">{stat.label}</span>

                <div className="astro-stat-card-bottom">
                  <span className="astro-stat-progress">
                    <span />
                  </span>

                  <span className="astro-stat-card-caption">
                    {index === 0
                      ? 'HOLISTIC BALANCE'
                      : index === 1
                        ? 'GUIDED PROCESS'
                        : 'ON-SITE GUIDANCE'}
                  </span>
                </div>

                <span className="astro-stat-watermark" aria-hidden="true">
                  {index === 0 ? '07' : index === 1 ? '04' : '10'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="astro-hero-bottom-mark" aria-hidden="true">
        <span />
        AN INTENTIONAL WAY FORWARD
      </div>
    </section>
  );
}