import React from 'react';

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section style={{
      padding: '56px 0 48px 0',
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
          maxWidth: '620px'
        }}>
          Turli nashriyot, ilmiy jurnallar va platformalardan yig'ilgan ilmiy maqolalar, mualliflar, DOI havolalari va bibliografik ma'lumotlar bazasi.
        </p>
      </div>
    </section>
  );
};
