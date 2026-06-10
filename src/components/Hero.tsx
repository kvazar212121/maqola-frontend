import React from 'react';
import { FileText, Users, Award } from 'lucide-react';

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section style={{
      padding: '72px 0 80px 0',
      background: 'linear-gradient(135deg, #005baa 0%, #003d73 100%)', /* Jiddiy to'q ko'k gradient fon */
      color: 'white',
      textAlign: 'center',
      borderBottom: '1px solid rgba(0,0,0,0.1)'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 600,
          fontFamily: 'var(--font-heading)',
          lineHeight: '1.2',
          marginBottom: '20px',
          letterSpacing: '0.5px',
          color: 'white',
          textAlign: 'center',
          width: '100%'
        }}>
          Ilmiy maqolalar va meta-ma'lumotlar bazasi
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: '16px',
          lineHeight: '1.6',
          maxWidth: '680px',
          marginBottom: '48px',
          fontFamily: 'var(--font-sans)'
        }}>
          Turli nashriyot, ilmiy jurnallar va platformalardan yig'ilgan ilmiy maqolalar, mualliflar, DOI havolalari va bibliografik ma'lumotlar bazasi.
        </p>

        {/* Bazadagi jami statistika panellari */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '900px'
        }}>
          
          {/* Maqolalar soni */}
          <div style={{
            flex: '1 1 240px',
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            border: 'none',
            transform: 'translateY(10px)'
          }}>
            <FileText size={28} color="var(--accent-blue)" />
            <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '-0.5px', lineHeight: '1' }}>
              4.8 MLN+
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Ilmiy maqolalar
            </span>
          </div>

          {/* Tadqiqotchilar soni */}
          <div style={{
            flex: '1 1 240px',
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            border: 'none',
            transform: 'translateY(10px)'
          }}>
            <Users size={28} color="var(--accent-orange)" />
            <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '-0.5px', lineHeight: '1' }}>
              180,000+
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Tadqiqotchilar
            </span>
          </div>

          {/* Iqtiboslar soni */}
          <div style={{
            flex: '1 1 240px',
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            border: 'none',
            transform: 'translateY(10px)'
          }}>
            <Award size={28} color="var(--accent-blue)" />
            <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '-0.5px', lineHeight: '1' }}>
              56 MLN+
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Jami iqtiboslar
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
