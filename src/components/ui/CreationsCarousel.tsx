'use client'

import Image from 'next/image'

interface Item {
  name: string
  cat: string
  img: string
}

export default function CreationsCarousel({ items }: { items: Item[] }) {
  const tripled = [...items, ...items, ...items]

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Fade edges, crème Baraka */}
      <div aria-hidden style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '140px', zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to right, #FAF7F2, transparent)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '140px', zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to left, #FAF7F2, transparent)',
      }} />

      <div
        className="baraka-carousel-track"
        style={{
          display: 'flex',
          gap: '0',
          width: 'max-content',
          animation: 'baraka-carousel-scroll 36s linear infinite',
        }}
      >
        {tripled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            style={{
              width: 'clamp(240px, 26vw, 360px)',
              flexShrink: 0,
              background: '#FAF7F2',
              borderRight: '1px solid rgba(26,20,16,0.07)',
              overflow: 'hidden',
            }}
          >
            {/* Image portrait */}
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <Image
                src={item.img}
                alt={item.name}
                fill
                unoptimized
                style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
                onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
                onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
              />
            </div>

            {/* Info */}
            <div style={{ padding: '1rem 1.25rem 1.4rem' }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '0.55rem',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#E81C1C',
                marginBottom: '0.3rem',
              }}>{item.cat}</p>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                color: '#1A1410',
                lineHeight: 1.1,
              }}>{item.name}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes baraka-carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .baraka-carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
