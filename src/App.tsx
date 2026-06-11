import { useState, useMemo, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterPanel } from './components/FilterPanel';
import { ArticleCard } from './components/ArticleCard';
import { ArticlePage } from './components/ArticlePage';
import { AdvancedSearchPanel } from './components/AdvancedSearchPanel';
import { AboutPage } from './components/AboutPage';
import type { Article, FilterState } from './types';
import { Info, Search, SlidersHorizontal, Loader2 } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categories: [],
    selectedTags: [],
    selectedAuthors: [],
    sortBy: 'date'
  });

  const [currentPath, setCurrentPath] = useState<string>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Ref orqali eng oxirgi articles qiymatini saqlash (stale closure muammosini hal qilish)
  const articlesRef = useRef<Article[]>([]);
  articlesRef.current = articles;

  // Hash routing yordamida alohida sahifalarni boshqarish
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/article/')) {
        const id = hash.replace('#/article/', '');
        // Avval yuklangan maqolalardan topamiz
        const found = articlesRef.current.find(art => art.id === id);
        if (found) {
          setSelectedArticle(found);
        }
        setCurrentPath('article');
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

        fetch(`http://localhost:8080/api/v1/articles/${id}/views`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ views: 1 }) }).catch(err => {
          console.warn("Backend view tracking failed:", err);
        });

        return;
      } else if (hash === '#/articles') {
        setCurrentPath('articles');
      } else if (hash === '#/about') {
        setCurrentPath('about');
      } else {
        setCurrentPath('home');
      }
      setSelectedArticle(null);
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCloseArticle = () => {
    window.location.hash = '#/articles';
  };

  const isHome = currentPath === 'home';

  // Maqolalarni backenddan tortib kelish
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        const limit = isHome ? '6' : '20';
        params.append('limit', limit);
        params.append('page', currentPage.toString());
        
        if (filters.searchQuery) params.append('title', filters.searchQuery);
        if (filters.advTitle) params.append('title', filters.advTitle);
        if (filters.advAuthor) params.append('authorName', filters.advAuthor);
        if (filters.advPublisher) params.append('publisher', filters.advPublisher);
        if (filters.advKeywords) params.append('keyWord', filters.advKeywords);

        const res = await fetch(`http://localhost:8080/api/v1/articles?${params.toString()}`);
        const json = await res.json();
        if (json.data) {
          setArticles(json.data);
          setTotalArticles(json.total || 0);
        }
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, [isHome, currentPage, filters]);

  const allTags = useMemo(() => {
    // Backend API'dan barcha teglarni olish kerak, ammo hozircha statik
    return ['Texnologiya', 'Sun\'iy intellekt', 'Tibbiyot', 'Iqtisodiyot', 'IT'];
  }, []);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
    setCurrentPage(1);
  };



  const handleLikeArticle = (articleId: string) => {
    setLikedArticles(prev => {
      if (prev.includes(articleId)) {
        return prev.filter(id => id !== articleId);
      } else {
        return [...prev, articleId];
      }
    });
  };

  const ARTICLES_PER_PAGE = isHome ? 6 : 20;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE) || 1;

  const displayedArticles = articles;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Yuqori qism (Navbar) */}
      <Header currentPath={currentPath} />

      {currentPath === 'article' && selectedArticle ? (
        <ArticlePage
          article={selectedArticle}
          onClose={handleCloseArticle}
          onLike={handleLikeArticle}
          hasLiked={likedArticles.includes(selectedArticle.id)}
        />
      ) : currentPath === 'about' ? (
        <AboutPage />
      ) : (
        <>
          {/* Hero faqat bosh sahifada */}
          {isHome && <Hero />}

          {/* Asosiy Kontent Bo'limi */}
          <main id="articles-section" style={{ padding: '48px 0', flexGrow: 1 }}>
            <div className="app-container">
              <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                backgroundColor: 'rgba(255, 255, 255, 0.6)', /* Bilinar-bilinmas oqish fon */
                padding: '32px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.03)'
              }}>
                
                <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                  
                  {/* Chap qism: Qidiruv va Maqolalar */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Qidiruv paneli va Kengaytirilgan Qidiruv */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                          <Search size={18} />
                        </div>
                        <input 
                          type="text" 
                          className="sharp-input" 
                          placeholder="Mavzular, kalit so'zlar yoki DOI bo'yicha qidirish..." 
                          value={filters.searchQuery} 
                          onChange={(e) => {
                            handleSearchChange(e.target.value);
                            if (isHome && e.target.value) {
                              window.location.hash = '#/articles';
                            }
                          }} 
                          style={{ 
                            paddingLeft: '48px', 
                            fontSize: '15px', 
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', 
                            border: '1px solid var(--border-color)',
                            height: '52px',
                            borderRadius: '6px'
                          }} 
                        />
                      </div>
                      
                      <button
                        onClick={() => {
                          setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
                          if (isHome) {
                            window.location.hash = '#/articles';
                          }
                        }}
                        className="sharp-btn"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '0 24px',
                          height: '52px',
                          backgroundColor: 'white',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          cursor: 'pointer'
                        }}
                      >
                        <SlidersHorizontal size={18} color="var(--accent-blue)" />
                        Kengaytirilgan qidiruv
                      </button>
                    </div>

                    <AdvancedSearchPanel
                      isOpen={isAdvancedSearchOpen}
                      filters={filters}
                      onFilterChange={handleFilterChange}
                    />

                    {/* Maqolalar Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {isHome ? 'Eng ko\'p o\'qilgan maqolalar' : (filters.categories.length > 0 ? `Tanlangan toifalar: ${filters.categories.join(', ')}` : 'Barcha maqolalar')}
                        {!isHome && filters.selectedTags.length > 0 && ` (${filters.selectedTags.map(t => `#${t}`).join(', ')})`}
                      </h3>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {isHome ? 'TOP 6' : `Jami: ${totalArticles} ta maqola`}
                      </span>
                    </div>

                    {/* Maqolalar Ro'yxati */}
                    {displayedArticles.length > 0 ? (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="articles-list">
                          {displayedArticles.map(article => (
                            <ArticleCard key={article.id} article={article} onSelect={() => { window.location.hash = `#/article/${article.id}`; }} />
                          ))}
                        </div>
                        
                        {/* Pagination Controls */}
                        {!isHome && totalPages > 1 && (
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
                            <button
                              onClick={() => {
                                setCurrentPage(p => Math.max(1, p - 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              disabled={currentPage === 1}
                              className="sharp-btn"
                              style={{ padding: '8px 12px', opacity: currentPage === 1 ? 0.5 : 1 }}
                            >
                              Oldingi
                            </button>
                            {Array.from({ length: totalPages }).map((_, i) => {
                              const pageNum = i + 1;
                              if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)) {
                                return (
                                  <button
                                    key={pageNum}
                                    onClick={() => {
                                      setCurrentPage(pageNum);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className={currentPage === pageNum ? "sharp-btn primary" : "sharp-btn"}
                                    style={{ padding: '8px 16px' }}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              }
                              if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                                return <span key={`dots-${pageNum}`} style={{ display: 'flex', alignItems: 'center', padding: '0 8px' }}>...</span>;
                              }
                              return null;
                            })}
                            <button
                              onClick={() => {
                                setCurrentPage(p => Math.min(totalPages, p + 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              disabled={currentPage === totalPages}
                              className="sharp-btn"
                              style={{ padding: '8px 12px', opacity: currentPage === totalPages ? 0.5 : 1 }}
                            >
                              Keyingisi
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="sharp-panel" style={{ textAlign: 'center', padding: '64px 20px', backgroundColor: 'var(--bg-panel)', borderStyle: 'dashed', borderRadius: '8px' }}>
                        <Info size={32} color="var(--accent-blue)" style={{ marginBottom: '16px', opacity: 0.8 }} />
                        <h4 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px', color: 'var(--text-primary)' }}>Maqola topilmadi</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '380px', margin: '0 auto' }}>Belgilangan qidiruv parametrlari va filtrlarga mos keladigan maqola topilmadi.</p>
                      </div>
                    )}
                  </div>

                  {/* O'ng qism: Vertikal Sidebar Filtr (Faqat Maqolalar sahifasida chiqadi) */}
                  {!isHome && (
                    <aside style={{ width: '320px', flexShrink: 0, position: 'sticky', top: '24px' }}>
                      <FilterPanel filters={filters} onFilterChange={handleFilterChange} allTags={allTags} />
                    </aside>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      )}

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--accent-blue)',
        color: 'white',
        padding: '48px 0 24px 0',
        fontSize: '14px',
        borderTop: 'none'
      }}>
        <div className="app-container" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: 'white', letterSpacing: '1px' }}>
                  META
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '22px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  MAQOLA
                </span>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px', lineHeight: '1.6', maxWidth: '350px' }}>
                O'zbekiston va xalqaro miqyosdagi ilmiy maqolalar, nashrlar hamda ularning bibliografik ma'lumotlarini o'zida jamlagan yagona ochiq platforma.
              </p>
            </div>
            
            <div style={{ flex: '1 1 300px' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'white' }}>Hamkorlarimiz</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
                <li>Oliy ta'lim, fan va innovatsiyalar vazirligi</li>
                <li>O'zbekiston Milliy Universiteti</li>
                <li>Toshkent Axborot Texnologiyalari Universiteti</li>
                <li>Toshkent Davlat Texnika Universiteti</li>
              </ul>
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'white' }}>Foydali havolalar</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <a href="#about" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Loyiha haqida</a>
                <a href="#terms" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Foydalanish shartlari</a>
                <a href="#contacts" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Aloqa</a>
                <a href="#faq" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Ko'p beriladigan savollar</a>
              </div>
            </div>
          </div>

          <div style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
              METAMAQOLA.UZ © {new Date().getFullYear()}. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </div>
      </footer>

      </div>
  );
}

export default App;
