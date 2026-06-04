import React, { useState } from 'react';
import { Filter, SortAsc, Hash, Users, ChevronDown, ChevronUp, CheckSquare, Square, Check, RotateCcw } from 'lucide-react';
import type { FilterState, Author } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  allTags: string[];
  allAuthors: Author[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  allTags,
  allAuthors
}) => {
  const [activeTab, setActiveTab] = useState<'categories' | 'tags' | 'authors' | 'sort' | null>(null);

  const toggleTab = (tab: 'categories' | 'tags' | 'authors' | 'sort') => {
    setActiveTab(prev => (prev === tab ? null : tab));
  };

  const toggleCategory = (category: string) => {
    const isSelected = filters.categories.includes(category);
    const newCategories = isSelected
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ categories: newCategories });
  };

  const toggleTag = (tag: string) => {
    const isSelected = filters.selectedTags.includes(tag);
    const newTags = isSelected
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag];
    onFilterChange({ selectedTags: newTags });
  };

  const toggleAuthor = (authorId: string) => {
    const isSelected = filters.selectedAuthors.includes(authorId);
    const newAuthors = isSelected
      ? filters.selectedAuthors.filter(id => id !== authorId)
      : [...filters.selectedAuthors, authorId];
    onFilterChange({ selectedAuthors: newAuthors });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      selectedTags: [],
      selectedAuthors: [],
      sortBy: 'date'
    });
    setActiveTab(null);
  };

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.selectedTags.length > 0 || 
    filters.selectedAuthors.length > 0 || 
    filters.sortBy !== 'date';

  const categories = ['Texnologiya', 'Ilmiy', 'Tibbiyot', 'Iqtisodiyot', 'Jamiyat'];

  return (
    <div style={{ marginBottom: '24px', width: '100%' }}>
      {/* Gorizontal tugmalar qatori */}
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        {/* Toifalar */}
        <button
          onClick={() => toggleTab('categories')}
          className={`sharp-btn ${activeTab === 'categories' ? 'primary' : ''}`}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <Filter size={14} />
          Toifalar {filters.categories.length > 0 && `(${filters.categories.length})`}
          {activeTab === 'categories' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Kalit so'zlar */}
        <button
          onClick={() => toggleTab('tags')}
          className={`sharp-btn ${activeTab === 'tags' ? 'primary' : ''}`}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <Hash size={14} />
          Kalit So'zlar {filters.selectedTags.length > 0 && `(${filters.selectedTags.length})`}
          {activeTab === 'tags' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Mualliflar */}
        <button
          onClick={() => toggleTab('authors')}
          className={`sharp-btn ${activeTab === 'authors' ? 'primary' : ''}`}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <Users size={14} />
          Mualliflar {filters.selectedAuthors.length > 0 && `(${filters.selectedAuthors.length})`}
          {activeTab === 'authors' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Saralash */}
        <button
          onClick={() => toggleTab('sort')}
          className={`sharp-btn ${activeTab === 'sort' ? 'teal' : ''}`}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <SortAsc size={14} />
          Saralash: {
            filters.sortBy === 'date' ? 'Yangi' : 
            filters.sortBy === 'views' ? 'Ko\'rishlar' : 'Iqtiboslar'
          }
          {activeTab === 'sort' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Filtrlarni tozalash */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="sharp-btn"
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              borderColor: 'rgba(104, 124, 110, 0.4)',
              marginLeft: 'auto'
            }}
          >
            <RotateCcw size={13} /> Tozalash
          </button>
        )}
      </div>

      {/* Ochiluvchi qism (Dropdown box) */}
      {activeTab && (
        <div 
          className="sharp-panel"
          style={{
            marginTop: '12px',
            padding: '20px',
            backgroundColor: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            animation: 'fadeIn 0.15s ease-out'
          }}
        >
          {/* TOIFALAR */}
          {activeTab === 'categories' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <h5 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-primary)' }}>Toifalarni belgilang</h5>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bir nechta tanlash mumkin</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {categories.map(cat => {
                  const isChecked = filters.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'none',
                        border: 'none',
                        color: isChecked ? 'var(--accent-blue)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontFamily: 'var(--font-sans)'
                      }}
                    >
                      {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* KALIT SO'ZLAR */}
          {activeTab === 'tags' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <h5 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-primary)' }}>Kalit so'zlarni belgilang</h5>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bir nechta tanlash mumkin</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allTags.map(tag => {
                  const isChecked = filters.selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`sharp-tag interactive ${isChecked ? 'active' : ''}`}
                      style={{
                        fontSize: '12px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: isChecked ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                        color: isChecked ? 'var(--accent-blue)' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-sans)'
                      }}
                    >
                      {isChecked && <Check size={12} />}
                      <span>#{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* MUALLIFLAR */}
          {activeTab === 'authors' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <h5 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-primary)' }}>Mualliflar bo'yicha saralash</h5>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bir nechta tanlash mumkin</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                {allAuthors.map(author => {
                  const isChecked = filters.selectedAuthors.includes(author.id);
                  return (
                    <button
                      key={author.id}
                      onClick={() => toggleAuthor(author.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'none',
                        border: 'none',
                        color: isChecked ? 'var(--accent-blue)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontFamily: 'var(--font-sans)',
                        padding: '6px',
                        backgroundColor: isChecked ? 'rgba(56, 189, 248, 0.03)' : 'transparent',
                        borderBottom: '1px solid rgba(104, 124, 110, 0.1)'
                      }}
                    >
                      {isChecked ? <CheckSquare size={16} style={{ flexShrink: 0 }} /> : <Square size={16} style={{ flexShrink: 0 }} />}
                      <div style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: 'var(--border-color)',
                        color: isChecked ? 'var(--accent-blue)' : 'var(--accent-teal)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 600,
                        flexShrink: 0
                      }}>
                        {author.avatar}
                      </div>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <strong>{author.name}</strong>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{author.institution}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SARALASH */}
          {activeTab === 'sort' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <h5 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-primary)' }}>Maqolalarni saralash tartibi</h5>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Faqat bittasini tanlash mumkin</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <button
                  onClick={() => onFilterChange({ sortBy: 'date' })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'none',
                    border: 'none',
                    color: filters.sortBy === 'date' ? 'var(--accent-teal)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {filters.sortBy === 'date' ? <CheckSquare size={16} /> : <Square size={16} />}
                  <span>Yangi chop etilganlar bo'yicha</span>
                </button>
                <button
                  onClick={() => onFilterChange({ sortBy: 'views' })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'none',
                    border: 'none',
                    color: filters.sortBy === 'views' ? 'var(--accent-teal)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {filters.sortBy === 'views' ? <CheckSquare size={16} /> : <Square size={16} />}
                  <span>Ko'p ko'rilganlar bo'yicha</span>
                </button>
                <button
                  onClick={() => onFilterChange({ sortBy: 'citations' })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'none',
                    border: 'none',
                    color: filters.sortBy === 'citations' ? 'var(--accent-teal)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  {filters.sortBy === 'citations' ? <CheckSquare size={16} /> : <Square size={16} />}
                  <span>Ko'p iqtibos olinganlar bo'yicha</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
