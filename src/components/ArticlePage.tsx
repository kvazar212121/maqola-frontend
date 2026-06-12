import React, { useState, useRef } from 'react';
import { ArrowLeft, Calendar, Clock, Eye, ThumbsUp, Quote, ExternalLink, Download, Copy, Check, Mail, Globe, Bookmark, Maximize } from 'lucide-react';
import type { Article } from '../types';

interface ArticlePageProps {
  article: Article;
  onClose: () => void;
  onLike: (articleId: string) => void;
  hasLiked: boolean;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  onClose,
  onLike,
  hasLiked
}) => {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedDoi, setCopiedDoi] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (pdfContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
      } else {
        pdfContainerRef.current.requestFullscreen().catch(err => console.log(err));
      }
    }
  };

  const authorName = article.authors && article.authors.length > 0 ? article.authors[0].name : 'Noma\'lum';
  const cleanAuthorName = authorName.replace('Dr. ', '');
  const authorNameParts = cleanAuthorName.split(' ');
  const initial = authorNameParts.length > 0 ? authorNameParts[0].charAt(0) : '';

  // Akademik iqtibos (Citation) matnini shakllantirish
  const generateCitation = () => {
    const year = article.publisherDate ? new Date(article.publisherDate).getFullYear() : new Date().getFullYear();
    const lastName = authorNameParts[authorNameParts.length - 1] || '';
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
    <div className="app-container" style={{ padding: '40px 20px 80px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Orqaga qaytish tugmasi */}
        <button 
          onClick={onClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '8px 0',
            fontFamily: 'var(--font-heading)',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '24px',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <ArrowLeft size={16} /> Barcha maqolalarga qaytish
        </button>

        {/* Maqola sahifasi asosiy paneli */}
        <div 
          className="sharp-panel"
          style={{ 
            backgroundColor: 'var(--bg-panel)',
            padding: '40px',
            boxShadow: '8px 8px 0px 0px var(--shadow-color)'
          }}
        >
          {/* Kategoriya va Sana */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '18px'
          }}>
            <span className="sharp-tag" style={{
              borderColor: 'var(--accent-blue)',
              color: 'var(--accent-blue)',
              backgroundColor: 'rgba(2, 132, 199, 0.05)'
            }}>
              {article.journal || article.accessType || 'Ilmiy maqola'}
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} /> {article.publisherDate}
            </span>
          </div>

          {/* Sarlavha */}
          <h1 style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 400,
            lineHeight: '1.3',
            color: 'var(--text-primary)',
            marginBottom: '28px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '24px',
            textAlign: 'left'
          }}>
            {article.title}
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '2.4fr 1.1fr',
            gap: '40px'
          }} className="modal-body-grid">
            
            {/* Maqola Matni */}
            <div>
              <div 
                className="article-text"
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}
              >
                {article.abstract && article.abstract !== 'n/a' ? (
                  <div 
                    style={{ color: 'var(--text-secondary)', textAlign: 'justify' }}
                    dangerouslySetInnerHTML={{ __html: article.abstract }}
                  />
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Annotatsiya mavjud emas.</p>
                )}
              </div>

              {/* Fayllar (Files) Bo'limi */}
              {(article.pdfUrl || article.url) && (() => {
                const rawPdfUrl = article.pdfUrl || article.url;
                const proxyUrl = `https://api-ilmdata.csti.uz/api/v1/proxy/pdf?url=${encodeURIComponent(rawPdfUrl)}`;
                return (
                <div style={{ marginTop: '40px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    Fayllar (Files)
                  </h3>
                  <div className="sharp-panel" style={{ padding: '0', overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📄 {article.title.substring(0, 40)}{article.title.length > 40 ? '...' : ''}.pdf
                      </span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={handleFullscreen}
                          className="sharp-btn"
                          style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Maximize size={14} /> To'liq ekran
                        </button>
                        <a 
                          href={rawPdfUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="sharp-btn primary"
                          style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Download size={14} /> Yuklab olish
                        </a>
                      </div>
                    </div>
                    {/* PDF Viewer Iframe */}
                    <div ref={pdfContainerRef} style={{ height: '600px', width: '100%', backgroundColor: '#525659' }}>
                      <iframe 
                        src={proxyUrl} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 'none' }}
                        title="PDF Viewer"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
                );
              })()}

              {/* Iqtibos keltirish bo'limi */}
              <div 
                className="sharp-panel"
                style={{
                  marginTop: '48px',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  padding: '24px'
                }}
              >
                <h4 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: 'var(--accent-teal)',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  letterSpacing: '0.5px'
                }}>
                  <Bookmark size={14} /> Maqolaga iqtibos keltirish (Harvard uslubida)
                </h4>
                <p style={{
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-panel)',
                  padding: '14px',
                  border: '1px solid var(--border-color)',
                  marginBottom: '14px',
                  lineHeight: '1.4',
                  wordBreak: 'break-all'
                }}>
                  {generateCitation()}
                </p>
                <button 
                  className="sharp-btn teal"
                  onClick={handleCopyCitation}
                  style={{ fontSize: '12px', padding: '8px 16px' }}
                >
                  {copiedCitation ? (
                    <>
                      <Check size={14} /> Nusxalandi!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Iqtibosni nusxalash
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* O'ng taraf: Metadata va Muallif */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Ma'lumotlar paneli */}
              <div 
                className="sharp-panel"
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px dashed var(--border-color)',
                  boxShadow: 'none'
                }}
              >
                <h4 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Ma'lumotlar
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                  {article.doi && (
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>DOI:</span>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '4px',
                        backgroundColor: 'var(--bg-panel)',
                        padding: '8px',
                        border: '1px solid var(--border-color)'
                      }}>
                        <code style={{ fontSize: '11px', color: 'var(--accent-blue)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' }}>{article.doi}</code>
                        <button 
                          onClick={handleCopyDoi}
                          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          title="DOI nusxalash"
                        >
                          {copiedDoi ? <Check size={14} color="var(--accent-teal)" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  )}

                  {article.publisher && (
                    <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Nashriyot:</span>
                      <span style={{ fontWeight: 500, marginTop: '2px' }}>{article.publisher}</span>
                    </div>
                  )}

                  {article.publisherDate && (
                    <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Nashr sanasi:</span>
                      <span style={{ fontWeight: 500, marginTop: '2px' }}>{article.publisherDate}</span>
                    </div>
                  )}

                  {article.journal && (
                    <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Jurnal:</span>
                      <span style={{ fontWeight: 500, marginTop: '2px' }}>{article.journal}</span>
                    </div>
                  )}

                  {article.accessType && (
                    <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Ruxsat turi:</span>
                      <span style={{ fontWeight: 500, marginTop: '2px' }}>{article.accessType}</span>
                    </div>
                  )}

                  {article.keyWords && article.keyWords.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Kalit so'zlar:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                        {article.keyWords.map((kw, i) => (
                          <span key={i} style={{ backgroundColor: 'var(--bg-panel)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', border: '1px solid var(--border-color)' }}>
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Ko'rildi:</span>
                    <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={13} /> {article.viewsCount}
                    </span>
                  </div>
                </div>

                {/* Hujjat yuklash va havola */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                  {article.url && (
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="sharp-btn primary"
                      style={{ width: '100%', fontSize: '12px', padding: '10px' }}
                    >
                      <ExternalLink size={14} /> Asl manbaga o'tish
                    </a>
                  )}

                  {article.sourceUrl && article.sourceUrl !== article.url && (
                    <a 
                      href={article.sourceUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="sharp-btn"
                      style={{ width: '100%', fontSize: '12px', padding: '10px' }}
                    >
                      <ExternalLink size={14} /> Boshqa manba havolasi
                    </a>
                  )}

                  {/* Yoqtirish tugmasi */}
                  <button 
                    onClick={() => onLike(article.id)}
                    className={`sharp-btn ${hasLiked ? 'teal' : ''}`}
                    style={{ width: '100%', fontSize: '12px', padding: '10px' }}
                  >
                    <ThumbsUp size={14} /> {hasLiked ? "Sizga yoqdi" : "Yoqdi deb belgilash"}
                  </button>
                </div>
              </div>

              {/* Muallif haqida */}
              <div 
                className="sharp-panel"
                style={{ padding: '20px', border: '1px solid var(--border-color)' }}
              >
                <h4 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Tadqiqotchi
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--border-color)',
                    color: 'var(--accent-teal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '16px'
                  }}>
                    {initial}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '14px', fontWeight: 600 }}>{authorName}</h5>
                  </div>
                </div>

                {article.authors && article.authors.length > 0 && article.authors[0].affiliation && (
                  <div style={{ fontSize: '12px', color: 'var(--text-primary)', marginBottom: '16px', padding: '8px 12px', backgroundColor: 'var(--bg-main)', borderLeft: '2px solid var(--accent-teal)' }}>
                    <strong>Tashkilot:</strong> {article.authors[0].affiliation}
                  </div>
                )}

                {/* Ijtimoiy tarmoqlar */}
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '14px', flexWrap: 'wrap' }}>
                  {article.authors && article.authors.length > 0 && article.authors[0].orcid && (
                    <a href={article.authors[0].orcid} target="_blank" rel="noreferrer" className="sharp-btn" style={{ padding: '6px 12px', fontSize: '11px', gap: '4px' }} title="ORCID">
                      <Globe size={12} /> <span>ORCID</span>
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
