import React from 'react';
import { BookOpen, FileText, Users, Award } from 'lucide-react';
import { mockArticles, mockAuthors } from '../mockData';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const articlesCount = mockArticles.length;
  const authorsCount = Object.keys(mockAuthors).length;
  const totalCitations = mockArticles.reduce((acc, art) => acc + (art.citationsCount || 0), 0);

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
            color: 'var(--bg-main)',
            padding: '6px 10px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: '18px',
            letterSpacing: '0.5px'
          }}>
            MAQOLA.UZ
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 500,
            fontSize: '14px',
            color: 'var(--text-secondary)',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Tadqiqotlar Portali
          </span>
        </a>

        {/* Portal statistikasi */}
        <div style={{
          display: 'flex',
          gap: '24px',
          fontSize: '13px',
          color: 'var(--text-secondary)'
        }} className="header-stats">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={14} color="var(--accent-blue)" />
            <span><strong>{articlesCount}</strong> maqolalar</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={14} color="var(--accent-teal)" />
            <span><strong>{authorsCount}</strong> tadqiqotchilar</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={14} color="var(--accent-blue)" />
            <span><strong>{totalCitations}</strong> iqtiboslar</span>
          </div>
        </div>

        {/* Navigatsiya tugmalari */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <a 
            href="#articles-section" 
            className="sharp-btn primary"
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            <BookOpen size={14} /> Maqolalarni O'qish
          </a>
        </div>
      </div>
    </header>
  );
};
