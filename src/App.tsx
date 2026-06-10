import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterPanel } from './components/FilterPanel';
import { ArticleCard } from './components/ArticleCard';
import { ArticlePage } from './components/ArticlePage';
import { AdvancedSearchPanel } from './components/AdvancedSearchPanel';
import { AboutPage } from './components/AboutPage';
import { mockArticles } from './mockData';
import type { Article, FilterState } from './types';
import { Info, Search, SlidersHorizontal } from 'lucide-react';

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

  // Hash routing yordamida alohida sahifalarni boshqarish
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/article/')) {
        const id = hash.replace('#/article/', '');
        const article = mockArticles.find(art => art.id === id);
        if (article) {
          setSelectedArticle(article);
          setCurrentPath('article');
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          return;
        }
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
    window.location.hash = '';
  };

  // Barcha mavjud kalit so'zlarni (tags) yig'ish
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    mockArticles.forEach(art => art.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet);
  }, []);

  // Filtrlangan va saralangan maqolalar
  const filteredAndSortedArticles = useMemo(() => {
    let result = [...mockArticles];

    // Qidiruv bo'yicha filter
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        art =>
          art.title.toLowerCase().includes(query) ||
          art.summary.toLowerCase().includes(query) ||
          art.author.name.toLowerCase().includes(query) ||
          art.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Kategoriyalar bo'yicha filter (ko'p tanlovli)
    if (filters.categories.length > 0) {
      result = result.filter(art => filters.categories.includes(art.category));
    }

    // Kalit so'zlar bo'yicha filter (ko'p tanlovli - barchasiga mos kelishi kerak)
    if (filters.selectedTags.length > 0) {
      result = result.filter(art => 
        filters.selectedTags.every(tag => art.tags.includes(tag))
      );
    }

    // Mualliflar bo'yicha filter (ko'p tanlovli)
    if (filters.selectedAuthors.length > 0) {
      result = result.filter(art => filters.selectedAuthors.includes(art.author.id));
    }

    // Kengaytirilgan qidiruv filtrlari
    if (filters.advTitle?.trim()) {
      result = result.filter(art => art.title.toLowerCase().includes(filters.advTitle!.toLowerCase()));
    }
    if (filters.advAuthor?.trim()) {
      result = result.filter(art => art.author.name.toLowerCase().includes(filters.advAuthor!.toLowerCase()));
    }
    if (filters.advKeywords?.trim()) {
      result = result.filter(art => art.tags.some(tag => tag.toLowerCase().includes(filters.advKeywords!.toLowerCase())));
    }
    if (filters.advPublisher?.trim()) {
      result = result.filter(art => art.publisher?.toLowerCase().includes(filters.advPublisher!.toLowerCase()));
    }
    if (filters.advDoi?.trim()) {
      result = result.filter(art => art.doi?.toLowerCase().includes(filters.advDoi!.toLowerCase()));
    }
    if (filters.advAbstract?.trim()) {
      result = result.filter(art => art.summary.toLowerCase().includes(filters.advAbstract!.toLowerCase()) || art.content.toLowerCase().includes(filters.advAbstract!.toLowerCase()));
    }

    // Saralash
    result.sort((a, b) => {
      if (filters.sortBy === 'views') {
        return b.views - a.views;
      }
      if (filters.sortBy === 'citations') {
        return (b.citationsCount || 0) - (a.citationsCount || 0);
      }
      // date bo'yicha saralash
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return result;
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
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

  const isHome = currentPath === 'home';
  const displayedArticles = isHome 
    ? [...mockArticles].sort((a, b) => b.views - a.views).slice(0, 6) 
    : filteredAndSortedArticles;

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
                        {isHome ? 'TOP 6' : `Jami: ${displayedArticles.length} ta maqola`}
                      </span>
                    </div>

                    {/* Maqolalar Ro'yxati */}
                    {displayedArticles.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="articles-list">
                        {displayedArticles.map(article => (
                          <ArticleCard key={article.id} article={article} onSelect={() => { window.location.hash = `#/article/${article.id}`; }} />
                        ))}
                      </div>
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
