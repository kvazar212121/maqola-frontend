import React from 'react';
import { FileText, Users, Award } from 'lucide-react';

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section style={{
      padding: '56px 0 56px 0',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'rgba(13, 148, 136, 0.04)',
      textAlign: 'center'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(28px, 4.8vw, 56px)',
          fontWeight: 400,
          lineHeight: '1.25',
          marginBottom: '16px',
          letterSpacing: '0.5px',
          color: 'var(--text-primary)',
          textAlign: 'center',
          width: '100%'
        }}>
          Ilmiy maqolalar va meta-ma'lumotlar bazasi
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '15px',
          lineHeight: '1.6',
          maxWidth: '620px',
          marginBottom: '32px'
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
          maxWidth: '850px'
        }} className="hero-stats-grid">
          
          {/* Maqolalar soni */}
          <div className="sharp-panel" style={{
            flex: '1 1 240px',
            padding: '20px 24px',
            backgroundColor: 'var(--bg-panel)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid var(--border-color)',
            boxShadow: '4px 4px 0px 0px var(--shadow-color)'
          }}>
            <FileText size={24} color="var(--accent-blue)" />
            <span style={{ fontSize: '26px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '0.5px' }}>
              4.8 MLN+
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>
              Ilmiy maqolalar
            </span>
          </div>

          {/* Tadqiqotchilar soni */}
          <div className="sharp-panel" style={{
            flex: '1 1 240px',
            padding: '20px 24px',
            backgroundColor: 'var(--bg-panel)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid var(--border-color)',
            boxShadow: '4px 4px 0px 0px var(--shadow-color)'
          }}>
            <Users size={24} color="var(--accent-teal)" />
            <span style={{ fontSize: '26px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '0.5px' }}>
              180,000+
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>
              Tadqiqotchilar
            </span>
          </div>

          {/* Iqtiboslar soni */}
          <div className="sharp-panel" style={{
            flex: '1 1 240px',
            padding: '20px 24px',
            backgroundColor: 'var(--bg-panel)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid var(--border-color)',
            boxShadow: '4px 4px 0px 0px var(--shadow-color)'
          }}>
            <Award size={24} color="var(--accent-blue)" />
            <span style={{ fontSize: '26px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '0.5px' }}>
              56 MLN+
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>
              Jami iqtiboslar
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
