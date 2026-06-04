import React from 'react';
import { LogIn, User } from 'lucide-react';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-main)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(8px)',
      background: 'var(--bg-header-rgba)'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px',
        gap: '20px'
      }}>
        {/* Logotip */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: 'var(--accent-blue)',
            color: '#ffffff',
            padding: '6px 10px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: '18px',
            letterSpacing: '0.5px'
          }}>
            METAMAQOLA.UZ
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: '14px',
            color: 'var(--text-secondary)',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }} className="portal-sub-title">
            Tadqiqotlar Portali
          </span>
        </a>

        {/* Navigatsiya Menulari */}
        <nav style={{
          display: 'flex',
          gap: '24px',
          fontSize: '14px',
          fontFamily: 'var(--font-heading)'
        }} className="header-nav">
          <a href="#" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            Bosh Sahifa
          </a>
          <a 
            href="#articles-section" 
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Maqolalar
          </a>
          <a 
            href="#about" 
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Loyiha haqida
          </a>
        </nav>

        {/* Profil va Kirish / Ro'yxatdan o'tish */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            className="sharp-btn"
            style={{ 
              fontSize: '13px', 
              padding: '6px 14px', 
              boxShadow: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogIn size={13} /> Kirish
          </button>
          <button 
            className="sharp-btn primary"
            style={{ 
              fontSize: '13px', 
              padding: '6px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <User size={13} /> Ro'yxatdan o'tish
          </button>
        </div>
      </div>
    </header>
  );
};
