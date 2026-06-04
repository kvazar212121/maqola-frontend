import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterPanel } from './components/FilterPanel';
import { ArticleCard } from './components/ArticleCard';
import { ArticlePage } from './components/ArticlePage';
import { mockArticles, mockAuthors } from './mockData';
import type { Article, FilterState } from './types';
import { Info, Search } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categories: [],
    selectedTags: [],
    selectedAuthors: [],
    sortBy: 'date'
  });

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);

  // Hash routing yordamida alohida sahifalarni boshqarish
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/article/')) {
        const id = hash.replace('#/article/', '');
        const article = mockArticles.find(art => art.id === id);
        if (article) {
          setSelectedArticle(article);
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          return;
        }
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

  // Barcha tadqiqotchilar ro'yxati
  const allAuthors = useMemo(() => {
    return Object.values(mockAuthors);
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

  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      selectedTags: [],
      selectedAuthors: [],
      sortBy: 'date'
    });
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Yuqori qism (Navbar) */}
      <Header />

      {selectedArticle ? (
        <ArticlePage
          article={selectedArticle}
          onClose={handleCloseArticle}
          onLike={handleLikeArticle}
          hasLiked={likedArticles.includes(selectedArticle.id)}
        />
      ) : (
        <>
          {/* Hero */}
          <Hero />

          {/* Asosiy Kontent Bo'limi */}
          <main id="articles-section" style={{ padding: '48px 0', flexGrow: 1 }}>
        <div className="app-container">
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            
            {/* Gorizontal Filtrlar paneli (Qidiruv maydonining tepasida) */}
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              allTags={allTags}
              allAuthors={allAuthors}
            />

            {/* Qidiruv paneli (Mavzular/DOI/Mualliflar uchun) */}
            <div style={{ position: 'relative', width: '100%', marginBottom: '32px' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}>
                <Search size={18} />
              </div>
              <input
                type="text"
                className="sharp-input"
                placeholder="Mavzular, mualliflar, kalit so'zlar yoki DOI bo'yicha qidirish..."
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                style={{
                  paddingLeft: '48px',
                  fontSize: '15px',
                  boxShadow: '4px 4px 0px 0px var(--shadow-color)',
                  height: '48px'
                }}
              />
            </div>

            {/* Maqolalar Ro'yxati Header qismi */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '12px'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
                fontWeight: 400
              }}>
                {filters.categories.length > 0 
                  ? `Tanlangan toifalar: ${filters.categories.join(', ')}` 
                  : 'Barcha maqolalar'}
                {filters.selectedTags.length > 0 && ` (${filters.selectedTags.map(t => `#${t}`).join(', ')})`}
              </h3>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Jami: <strong>{filteredAndSortedArticles.length}</strong> ta maqola topildi
              </span>
            </div>

            {/* Maqolalar Grid tarmog'i */}
            {filteredAndSortedArticles.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
                gap: '24px'
              }} className="articles-grid">
                {filteredAndSortedArticles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={() => {
                      window.location.hash = `#/article/${article.id}`;
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="sharp-panel" style={{
                textAlign: 'center',
                padding: '48px',
                backgroundColor: 'var(--bg-panel)',
                borderStyle: 'dashed'
              }}>
                <Info size={32} color="var(--accent-blue)" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>Maqola topilmadi</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '380px', margin: '0 auto' }}>
                  Belgilangan qidiruv parametrlari va filtrlarga mos keladigan maqola topilmadi.
                </p>
                <button 
                  className="sharp-btn primary"
                  onClick={clearAllFilters}
                  style={{ marginTop: '20px', fontSize: '12px' }}
                >
                  Filtrlarni tozalash
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
        </>
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '32px 0',
        backgroundColor: 'var(--bg-panel)',
        fontSize: '13px',
        color: 'var(--text-secondary)'
      }}>
        <div className="app-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
              METAMAQOLA.UZ © {new Date().getFullYear()}
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Ushbu platforma ilmiy ishlar, maqolalar va ularning bibliografik ma'lumotlarini to'plash maqsadida yaratilgan.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#about" className="hover-underline">Loyiha haqida</a>
            <a href="#terms" className="hover-underline">Foydalanish shartlari</a>
            <a href="#contacts" className="hover-underline">Aloqa</a>
          </div>
        </div>
      </footer>


    </div>
  );
}

export default App;
