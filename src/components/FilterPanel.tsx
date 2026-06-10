import React from 'react';
import { Filter, Tag } from 'lucide-react';
import type { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  allTags: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  allTags
}) => {

  const categories = [
    "Qishloq xo'jaligi va biologiya fanlari",
    "San'at va gumanitar fanlar",
    "Biokimyo, genetika va molekulyar biologiya",
    "Biznes, menejment va buxgalteriya",
    "Kimyoviy muhandislik",
    "Kimyo",
    "Kompyuter fanlari",
    "Qaror qabul qilish fanlari",
    "Stomatologiya",
    "Yer va sayyora fanlari",
    "Iqtisodiyot, ekonometriya va moliya",
    "Energiya",
    "Muhandislik",
    "Atrof-muhit fanlari"
  ];

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



  return (
    <div style={{
      backgroundColor: 'var(--bg-panel)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', margin: 0, fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={18} color="var(--accent-blue)" /> FILTRLAR
        </h3>
        {(filters.categories.length > 0 || filters.selectedTags.length > 0 || filters.selectedAuthors.length > 0) && (
          <button 
            onClick={() => onFilterChange({ categories: [], selectedTags: [], selectedAuthors: [] })}
            style={{ background: 'none', border: 'none', color: 'var(--accent-orange)', fontSize: '13px', cursor: 'pointer', padding: 0, fontWeight: 500 }}
          >
            Tozalash
          </button>
        )}
      </div>

      {/* Saralash (Sort) */}
      <div>
        <h4 style={{ fontSize: '13px', marginBottom: '12px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Saralash</h4>
        <select 
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-input)',
            fontSize: '14px',
            outline: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)'
          }}
        >
          <option value="date">Yangi qo'shilganlar</option>
          <option value="views">Ko'p ko'rilganlar</option>
          <option value="citations">Ko'p iqtibos olinganlar</option>
        </select>
      </div>

      {/* Fan yo'nalishi (Kategoriyalar) */}
      <div>
        <h4 style={{ fontSize: '13px', marginBottom: '12px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Fan yo'nalishi</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '350px', overflowY: 'auto', paddingRight: '8px' }}>
          {categories.map(cat => (
            <label key={cat} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              <input 
                type="checkbox" 
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                style={{ marginTop: '2px', cursor: 'pointer' }}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Kalit so'zlar */}
      <div>
        <h4 style={{ fontSize: '13px', marginBottom: '12px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
          <Tag size={14} /> Kalit so'zlar
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {allTags.slice(0, 15).map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '12px',
                border: `1px solid ${filters.selectedTags.includes(tag) ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                backgroundColor: filters.selectedTags.includes(tag) ? 'rgba(0, 74, 139, 0.05)' : 'transparent',
                color: filters.selectedTags.includes(tag) ? 'var(--accent-blue)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: filters.selectedTags.includes(tag) ? 600 : 400
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>



    </div>
  );
};
