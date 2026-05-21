import { useState, useEffect, useCallback } from 'react';

const INTERVAL = 5000;

// Slide 1 — banner image (AMD EPYC style reference)
function Slide1() {
  return (
    <div className="absolute inset-0" style={{ background: '#0D1B2A' }}>
      <img src="/slide1.png" alt="Featured product promotion" className="h-full w-full" style={{ objectFit: 'cover', objectPosition: 'center' }} />
    </div>
  );
}

// Slide 2 — banner image (Enterprise style reference)
function Slide2() {
  return (
    <div className="absolute inset-0" style={{ background: '#1A0A00' }}>
      <img src="/slide2.png" alt="Volume pricing promotion" className="h-full w-full" style={{ objectFit: 'cover', objectPosition: 'center' }} />
    </div>
  );
}

// Slide 3 — SBE Banner Ad
function Slide3() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: '#0B372B' }}>
      <img
        src="/sbe-banner.png"
        alt="BackdPayments — Net Terms for B2B"
        className="h-full w-full"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

const SLIDES = [Slide1, Slide2, Slide3];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ border: '1px solid #E5E1D8', minHeight: 320, height: '100%' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide container */}
      <div style={{ position: 'relative', minHeight: 320, height: '100%' }}>
        {SLIDES.map((SlideComponent, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.5s ease',
              pointerEvents: i === current ? 'auto' : 'none',
            }}
          >
            <SlideComponent />
          </div>
        ))}
      </div>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-lg text-white transition-colors"
        style={{ background: 'rgba(0,0,0,0.25)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.50)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.25)')}
      >
        ‹
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-lg text-white transition-colors"
        style={{ background: 'rgba(0,0,0,0.25)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.50)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.25)')}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              height: 5,
              width: i === current ? 20 : 5,
              borderRadius: 3,
              background: i === current ? '#A8533A' : 'rgba(255,255,255,0.55)',
              border: 'none',
              cursor: 'pointer',
              transition: 'width 0.3s ease, background 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
