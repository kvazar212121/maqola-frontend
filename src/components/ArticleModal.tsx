import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Eye, ThumbsUp, Quote, ExternalLink, Download, Copy, Check, Mail, Globe, Bookmark } from 'lucide-react';
import type { Article } from '../types';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  onLike: (articleId: string) => void;
  hasLiked: boolean;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onLike,
  hasLiked
}) => {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedDoi, setCopiedDoi] = useState(false);

  // Esc klavishasini bosganda yopish
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Akademik iqtibos (Citation) matnini shakllantirish
  const generateCitation = () => {
    const year = new Date(article.publishedAt).getFullYear();
    const cleanAuthorName = article.author.name.replace('Dr. ', '');
    const names = cleanAuthorName.split(' ');
    const lastName = names[names.length - 1];
    const initial = names[0].charAt(0);
    const publisherText = article.publisher ? `. *${article.publisher}*` : '';
    const doiText = article.doi ? `. DOI: ${article.doi}` : '';
    
    return `${lastName}, ${initial}. (${year}). ${article.title}${publisherText}${doiText}`;
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(generateCitation());
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleCopyDoi = () => {
    if (article.doi) {
      navigator.clipboard.writeText(article.doi);
      setCopiedDoi(true);
      setTimeout(() => setCopiedDoi(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ borderRadius: '0px' }}
      >
        {/* Yopish tugmasi */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          className="sharp-btn"
          title="Yopish (Esc)"
        >
          <X size={18} />
        </button>

        {/* Modal tanasi */}
        <div style={{ padding: '32px' }}>
          {/* Kategoriya va Sana */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            marginBottom: '16px'
          }}>
            <span className="sharp-tag" style={{
              borderColor: 'var(--accent-blue)',
              color: 'var(--accent-blue)'
            }}>
              {article.category}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} /> {article.publishedAt}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> {article.readTime} daqiqa o'qish
            </span>
          </div>

          {/* Sarlavha */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: 400,
            lineHeight: '1.25',
            color: 'var(--text-primary)',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '20px'
          }}>
            {article.title}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '2.5fr 1fr',
            gap: '32px'
          }} className="modal-body-grid">
            
            {/* Maqola Matni (Markdown formatida) */}
            <div>
              <div 
                className="article-text"
                style={{
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {/* To'liq matn. Haqiqiy loyihada react-markdown kabi kutubxonadan foydalanish mumkin, 
                    biz bu yerda formatlangan HTML ko'rinishida chiqaramiz */}
                {article.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} style={{ fontSize: '20px', fontWeight: 700, marginTop: '16px', color: 'var(--text-primary)' }}>{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('#### ')) {
                    return <h4 key={index} style={{ fontSize: '16px', fontWeight: 700, marginTop: '12px', color: 'var(--accent-teal)' }}>{paragraph.replace('#### ', '')}</h4>;
                  }
                  if (paragraph.startsWith('* ')) {
                    const listItems = paragraph.split('\n');
                    return (
                      <ul key={index} style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {listItems.map((item, itemIdx) => (
                          <li key={itemIdx}>{item.replace('* ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={index} style={{ color: 'var(--text-secondary)' }}>{paragraph}</p>;
                })}
              </div>

              {/* Iqtibos keltirish bo'limi (Bibliography Builder) */}
              <div 
                className="sharp-panel"
                style={{
                  marginTop: '40px',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  padding: '20px'
                }}
              >
                <h4 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  color: 'var(--accent-teal)',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Bookmark size={14} /> Maqolaga iqtibos keltirish (Harvard uslubida)
                </h4>
                <p style={{
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-main)',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  marginBottom: '12px',
                  lineHeight: '1.4',
                  wordBreak: 'break-all'
                }}>
                  {generateCitation()}
                </p>
                <button 
                  className="sharp-btn teal"
                  onClick={handleCopyCitation}
                  style={{ fontSize: '11px', padding: '6px 12px' }}
                >
                  {copiedCitation ? (
                    <>
                      <Check size={12} /> Nusxalandi!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Iqtibosni nusxalash
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* O'ng taraf: Metadata va Muallif haqida */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Maqola parametrlari */}
              <div 
                className="sharp-panel"
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px dashed var(--border-color)'
                }}
              >
                <h4 style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Ma'lumotlar
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                  {article.doi && (
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>DOI:</span>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '4px',
                        backgroundColor: 'var(--bg-main)',
                        padding: '6px',
                        border: '1px solid var(--border-color)'
                      }}>
                        <code style={{ fontSize: '10px', color: 'var(--accent-blue)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{article.doi}</code>
                        <button 
                          onClick={handleCopyDoi}
                          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        >
                          {copiedDoi ? <Check size={12} color="var(--accent-teal)" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>
                  )}

                  {article.publisher && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Nashriyot:</span>
                      <span style={{ fontWeight: 500 }}>{article.publisher}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Iqtiboslar:</span>
                    <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Quote size={12} /> {article.citationsCount || 0} ta
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Ko'rildi:</span>
                    <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={12} /> {article.views}
                    </span>
                  </div>
                </div>

                {/* Hujjat yuklash va Havola */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                  {article.downloadUrl && (
                    <a 
                      href={article.downloadUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="sharp-btn primary"
                      style={{ width: '100%', fontSize: '11px', padding: '8px' }}
                    >
                      <Download size={12} /> Hujjatni yuklab olish (PDF)
                    </a>
                  )}

                  {article.externalUrl && (
                    <a 
                      href={article.externalUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="sharp-btn"
                      style={{ width: '100%', fontSize: '11px', padding: '8px' }}
                    >
                      <ExternalLink size={12} /> Asl manba havolasi
                    </a>
                  )}

                  {/* Yoqtirish tugmasi */}
                  <button 
                    onClick={() => onLike(article.id)}
                    className={`sharp-btn ${hasLiked ? 'teal' : ''}`}
                    style={{ width: '100%', fontSize: '11px', padding: '8px' }}
                  >
                    <ThumbsUp size={12} /> {hasLiked ? "Sizga yoqdi" : "Yoqdi deb belgilash"} ({article.likes + (hasLiked ? 1 : 0)})
                  </button>
                </div>
              </div>

              {/* Muallif Haqida batafsil */}
              <div 
                className="sharp-panel"
                style={{ padding: '16px', border: '1px solid var(--border-color)' }}
              >
                <h4 style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Tadqiqotchi
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'var(--border-color)',
                    color: 'var(--accent-teal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px'
                  }}>
                    {article.author.avatar}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '13px', fontWeight: 600 }}>{article.author.name}</h5>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{article.author.role}</p>
                  </div>
                </div>

                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
                  {article.author.bio}
                </p>

                {article.author.institution && (
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', padding: '6px 8px', backgroundColor: 'var(--bg-main)', borderLeft: '2px solid var(--accent-teal)' }}>
                    <strong>Tashkilot:</strong> {article.author.institution}
                  </div>
                )}

                {/* Muallif ijtimoiy tarmoqlari */}
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  {article.author.socialLinks.email && (
                    <a href={`mailto:${article.author.socialLinks.email}`} className="sharp-btn" style={{ padding: '4px 8px' }} title="Elektron pochta">
                      <Mail size={12} />
                    </a>
                  )}
                  {article.author.socialLinks.website && (
                    <a href={article.author.socialLinks.website} target="_blank" rel="noreferrer" className="sharp-btn" style={{ padding: '4px 8px' }} title="Veb-sayt">
                      <Globe size={12} />
                    </a>
                  )}
                  {article.author.socialLinks.github && (
                    <a href={article.author.socialLinks.github} target="_blank" rel="noreferrer" className="sharp-btn" style={{ padding: '4px 8px' }} title="GitHub">
                      <Globe size={12} /> <span style={{ fontSize: '10px' }}>GitHub</span>
                    </a>
                  )}
                  {article.author.socialLinks.linkedin && (
                    <a href={article.author.socialLinks.linkedin} target="_blank" rel="noreferrer" className="sharp-btn" style={{ padding: '4px 8px' }} title="LinkedIn">
                      <Globe size={12} /> <span style={{ fontSize: '10px' }}>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
