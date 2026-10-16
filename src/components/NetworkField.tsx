import React from 'react';
import { Link } from 'react-router-dom';
import { formatMemberCount, useChapters } from '@/hooks/useChapters';

interface NetworkFieldProps {
  compact?: boolean;
}

const NetworkField = ({ compact = false }: NetworkFieldProps) => {
  const { data: chapters } = useChapters();
  const nodes = chapters ?? [];

  return (
    <div
      className={`network-field ${compact ? 'network-field--compact' : ''}`}
      aria-label="Wild AI chapter network"
    >
      <div className="network-field__header">
        <p>Wild AI chapters</p>
        <span>{nodes.length} communities</span>
      </div>
      <div className="network-field__list">
        {nodes.map((chapter, index) => {
          const members = formatMemberCount(chapter.member_count);
          return (
          <Link key={chapter.id} to={`/${chapter.slug}`} className="network-field__node">
            <span className="network-field__index">{String(index + 1).padStart(2, '0')}</span>
            <span className="network-field__copy">
              <span className="network-field__city">{chapter.city}</span>
              <span className="network-field__status">
                <span
                  className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${
                    chapter.status === 'active' ? 'bg-accent' : 'bg-ember'
                  }`}
                />
                {chapter.status === 'active' ? 'Active' : 'Launching'}
                {members ? ` · ${members}` : ''}
              </span>
            </span>
            <span aria-hidden="true">→</span>
          </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NetworkField;
