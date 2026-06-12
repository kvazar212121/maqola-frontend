import React from 'react';
import { Filter } from 'lucide-react';
import type { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange
}) => {







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







    </div>
  );
};
