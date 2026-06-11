import React, { useState } from 'react';
import { Eye, ThumbsUp, Quote, ExternalLink, Download, Copy, Check } from 'lucide-react';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyDoi = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (article.doi) {
      navigator.clipboard.writeText(article.doi);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article 
      className="sharp-panel interactive" 
      onClick={onSelect}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Yuqori qator: Teglar va sana */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '12px',
        color: 'var(--text-secondary)'
      }}>
        <span style={{
          backgroundColor: 'var(--accent-blue)',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '4px',
          fontWeight: 600,
          fontFamily: 'var(--font-sans)'
        }}>
          {article.journal || article.accessType || 'Ilmiy maqola'}
        </span>
        <span>{article.publisherDate}</span>
      </div>

      {/* Sarlavha (Original shrift saqlanadi) */}
      <h4 style={{
        fontSize: '22px',
        fontWeight: 600,
        fontFamily: 'var(--font-heading)',
        color: 'var(--accent-blue)',
        lineHeight: '1.3',
        margin: '4px 0 0 0'
      }}>
        {article.title}
      </h4>

      {/* Muallif va tashkilot */}
      <div style={{
        fontSize: '14px',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-sans)'
      }}>
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
          {article.authors && article.authors.length > 0 ? article.authors[0].name : "Noma'lum muallif"}
        </span>
        {article.authors && article.authors.length > 0 && article.authors[0].affiliation && ` — ${article.authors[0].affiliation}`}
      </div>

      {/* Tavsif */}
      <p style={{
        fontSize: '14px',
        color: 'var(--text-primary)',
        lineHeight: '1.6',
        marginTop: '8px',
        marginBottom: '12px'
      }}>
        {(() => {
          if (!article.abstract || article.abstract === 'n/a') return '';
          // HTML teglarni olib tashlash
          const clean = article.abstract.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
          return clean.length > 200 ? clean.substring(0, 200) + '...' : clean;
        })()}
      </p>

      {/* Pastki qator: DOI, Statistika, Havolalar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '12px',
        fontSize: '13px',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-sans)',
        flexWrap: 'wrap',
        gap: '12px'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* DOI */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Eye size={16} />
            <span>{article.viewsCount}</span>
          </div>
          {article.doi && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 600 }}>DOI:</span>
              <code>{article.doi}</code>
              <button 
                onClick={handleCopyDoi}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copied ? 'var(--accent-blue)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '2px'
                }}
                title="DOI nusxalash"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          )}
        </div>

        {/* Statistika va Havolalar */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Likes and citations count removed as backend doesn't provide them */}
          <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
            {article.url && (
              <a 
                href={article.url} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '4px', 
                  color: 'var(--accent-blue)', fontWeight: 600, textDecoration: 'none' 
                }}
              >
                <Download size={14} /> PDF
              </a>
            )}
            {article.sourceUrl && (
              <a 
                href={article.sourceUrl} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '4px', 
                  color: 'var(--text-primary)', fontWeight: 500, textDecoration: 'none' 
                }}
              >
                <ExternalLink size={14} /> Manba
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
