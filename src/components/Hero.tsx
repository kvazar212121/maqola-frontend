import React from 'react';
import { FileText, Users } from 'lucide-react';

interface HeroProps {
  totalArticles?: number;
}

export const Hero: React.FC<HeroProps> = ({ totalArticles = 0 }) => {
  return (
    <section style={{
      padding: '72px 0 80px 0',
      backgroundColor: '#003d73',
      backgroundImage: `linear-gradient(to right, #005baa 0%, rgba(0, 61, 115, 0.9) 45%, rgba(0, 61, 115, 0.1) 100%), url('/1.jpg')`,
      backgroundPosition: 'center, center right',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundSize: 'auto, cover',
      color: 'white',
      borderBottom: '1px solid rgba(0,0,0,0.1)'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
            lineHeight: '1.2',
            marginBottom: '20px',
            letterSpacing: '0.5px',
            color: 'white',
            maxWidth: '800px'
          }}>
            O'zbekistonning eng yirik ilmiy maqolalar bazasi
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '48px',
            maxWidth: '700px',
            lineHeight: '1.6',
            fontWeight: 300
          }}>
            Minglab ilmiy nashrlar, tadqiqotlar va maqolalarni bir joydan toping. Ilmiy izlanishlaringiz uchun ishonchli manba.
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '350px'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '20px 24px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            transition: 'transform 0.3s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <FileText size={24} />
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'white', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                {totalArticles > 0 ? totalArticles.toLocaleString() : "0"}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
                ILMIY MAQOLALAR
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '20px 24px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            transition: 'transform 0.3s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'white', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                180,000+
              </div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
                TADQIQOTCHILAR
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
