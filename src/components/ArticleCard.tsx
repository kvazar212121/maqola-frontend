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
        justifyContent: 'space-between',
        height: '100%',
        gap: '18px'
      }}
    >
      {/* Kategoriya va Sana */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: 'var(--text-secondary)'
      }}>
        <span className="sharp-tag" style={{
          borderColor: 'rgba(56, 189, 248, 0.3)',
          color: 'var(--accent-blue)'
        }}>
          {article.category}
        </span>
        <span style={{ fontSize: '11px' }}>{article.publishedAt} • {article.readTime} daqiqa</span>
      </div>

      {/* Sarlavha va Tavsif */}
      <div style={{ flexGrow: 1 }}>
        <h4 style={{
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '1.35',
          marginBottom: '8px',
          color: 'var(--text-primary)'
        }}>
          {article.title}
        </h4>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {article.summary}
        </p>
      </div>

      {/* DOI va Nashriyot ma'lumotlari */}
      {article.doi && (
        <div 
          onClick={(e) => e.stopPropagation()} // Card click hodisasi bilan to'qnashmasligi uchun
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            fontSize: '11px',
            fontFamily: 'var(--font-sans)'
          }}
        >
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
            <span style={{ color: 'var(--text-muted)', marginRight: '4px' }}>DOI:</span>
            <code style={{ fontSize: '11px', padding: 0, background: 'transparent' }}>{article.doi}</code>
          </div>
          <button 
            onClick={handleCopyDoi}
            style={{
              background: 'none',
              border: 'none',
              color: copied ? 'var(--accent-teal)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px'
            }}
            title="DOI havolasini nusxalash"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>
      )}

      {/* Muallif Haqida */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '12px'
      }}>
        <div style={{
          width: '30px',
          height: '30px',
          backgroundColor: 'var(--border-color)',
          color: 'var(--accent-teal)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '12px'
        }}>
          {article.author.avatar}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h6 style={{ fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {article.author.name}
          </h6>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {article.author.institution || article.author.role}
          </p>
        </div>
      </div>

      {/* Statistika va Havolalar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: 'var(--text-secondary)',
        borderTop: '1px dotted var(--border-color)',
        paddingTop: '10px'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }} title="Ko'rishlar soni">
            <Eye size={12} /> {article.views}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }} title="Yoqtirishlar soni">
            <ThumbsUp size={12} /> {article.likes}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }} title="Iqtiboslar soni">
            <Quote size={12} /> {article.citationsCount || 0}
          </span>
        </div>

        {/* Hujjat yuklash yoki tashqi havola */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {article.downloadUrl && (
            <a 
              href={article.downloadUrl} 
              target="_blank" 
              rel="noreferrer"
              className="sharp-tag interactive"
              style={{ padding: '2px 6px', fontSize: '10px' }}
              title="PDF yuklab olish"
            >
              <Download size={10} style={{ marginRight: '3px' }} /> PDF
            </a>
          )}
          {article.externalUrl && (
            <a 
              href={article.externalUrl} 
              target="_blank" 
              rel="noreferrer"
              className="sharp-tag interactive"
              style={{ padding: '2px 6px', fontSize: '10px' }}
              title="Asl manbaga o'tish"
            >
              <ExternalLink size={10} style={{ marginRight: '3px' }} /> Manba
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
