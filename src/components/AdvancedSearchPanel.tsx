import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import type { FilterState } from '../types';

interface AdvancedSearchPanelProps {
  isOpen: boolean;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export const AdvancedSearchPanel: React.FC<AdvancedSearchPanelProps> = ({
  isOpen,
  filters,
  onFilterChange
}) => {
  const [localFilters, setLocalFilters] = useState({
    advTitle: filters.advTitle || '',
    advAuthor: filters.advAuthor || '',
    advAbstract: filters.advAbstract || '',
    advKeywords: filters.advKeywords || '',
    advPublisher: filters.advPublisher || '',
    advDoi: filters.advDoi || '',
  });

  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        advTitle: filters.advTitle || '',
        advAuthor: filters.advAuthor || '',
        advAbstract: filters.advAbstract || '',
        advKeywords: filters.advKeywords || '',
        advPublisher: filters.advPublisher || '',
        advDoi: filters.advDoi || '',
      });
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const handleApply = () => {
    onFilterChange({
      advTitle: localFilters.advTitle,
      advAuthor: localFilters.advAuthor,
      advAbstract: localFilters.advAbstract,
      advKeywords: localFilters.advKeywords,
      advPublisher: localFilters.advPublisher,
      advDoi: localFilters.advDoi,
    });
  };

  const handleClear = () => {
    const emptyFilters = {
      advTitle: '',
      advAuthor: '',
      advAbstract: '',
      advKeywords: '',
      advPublisher: '',
      advDoi: '',
    };
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginTop: '6px'
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    display: 'block'
  };

  return (
    <div className="sharp-panel" style={{
      backgroundColor: 'var(--bg-panel)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      marginBottom: '32px',
      marginTop: '-16px', // qidiruv bari bilan oraliqni moslash
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      overflow: 'hidden'
    }}>
      {/* Qidiruv formasi */}
      <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        <div>
          <label style={labelStyle}>Maqola nomi</label>
          <input 
            type="text" 
            placeholder="Maqola nomini kiriting" 
            value={localFilters.advTitle}
            onChange={(e) => setLocalFilters({...localFilters, advTitle: e.target.value})}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Muallif ism-familiyasi</label>
          <input 
            type="text" 
            placeholder="Muallif ismini kiriting" 
            value={localFilters.advAuthor}
            onChange={(e) => setLocalFilters({...localFilters, advAuthor: e.target.value})}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Teglar / Kalit so'zlar</label>
          <input 
            type="text" 
            placeholder="Kalit so'zlarni kiriting" 
            value={localFilters.advKeywords}
            onChange={(e) => setLocalFilters({...localFilters, advKeywords: e.target.value})}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Nashriyot (Publisher)</label>
          <input 
            type="text" 
            placeholder="Nashriyot nomini kiriting" 
            value={localFilters.advPublisher}
            onChange={(e) => setLocalFilters({...localFilters, advPublisher: e.target.value})}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Maqola DOI</label>
          <input 
            type="text" 
            placeholder="Masalan: 10.1016/j.plant..." 
            value={localFilters.advDoi}
            onChange={(e) => setLocalFilters({...localFilters, advDoi: e.target.value})}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Annotatsiya (Abstract)</label>
          <input 
            type="text" 
            placeholder="Annotatsiya matnidan qidirish" 
            value={localFilters.advAbstract}
            onChange={(e) => setLocalFilters({...localFilters, advAbstract: e.target.value})}
            style={inputStyle}
          />
        </div>

      </div>

      {/* Footer */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-main)' }}>
        <button 
          onClick={handleClear}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}
        >
          Filtrlarni tozalash
        </button>

        <button 
          onClick={handleApply}
          className="sharp-btn primary"
          style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Search size={16} /> Qidirish
        </button>
      </div>
    </div>
  );
};
