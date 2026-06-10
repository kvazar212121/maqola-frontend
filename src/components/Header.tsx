import React from 'react';
import { LogIn } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  return (
    <header style={{
      backgroundColor: 'var(--accent-blue)', // Zenodo ko'k rangi
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '65px',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* METAMAQOLA Logotipi (Zenodo uslubida) */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 800, 
            fontSize: '26px',
            color: 'white',
            letterSpacing: '1px'
          }}>
            META
          </span>
          <span style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 400, 
            fontSize: '26px',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            MAQOLA
          </span>
        </a>

        {/* Navigatsiya Menulari */}
        <nav style={{
          display: 'flex',
          gap: '24px',
          fontSize: '15px',
          fontFamily: 'var(--font-sans)',
          fontWeight: 500
        }}>
          <a href="#/" style={{ color: currentPath === 'home' ? 'white' : 'rgba(255,255,255,0.8)' }}>Bosh Sahifa</a>
          <a href="#/articles" style={{ color: currentPath === 'articles' ? 'white' : 'rgba(255,255,255,0.8)' }}>Maqolalar</a>
          <a href="#/about" style={{ color: currentPath === 'about' ? 'white' : 'rgba(255,255,255,0.8)' }}>Loyiha haqida</a>
        </nav>

        {/* Kirish va Ro'yxatdan o'tish tugmalari (Zenodo Style) */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            style={{ 
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid white',
              borderRadius: '4px',
              padding: '6px 16px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-sans)'
            }}
          >
            <LogIn size={16} /> Log In
          </button>
          
          <button 
            style={{ 
              backgroundColor: 'var(--accent-orange)', // Zenodo'ning mashhur zarg'aldoq tugmasi
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '7px 20px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
};
