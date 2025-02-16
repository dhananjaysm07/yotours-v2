// components/ui/expandable-section.tsx
'use client';

import { useState, ReactNode } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ExpandableSection({
  title,
  children,
  className = '',
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`row y-gap-20 ${className}`}>
      <div className="col-12">
        <h2 onClick={() => setIsExpanded(!isExpanded)} className="expand">
          {title} {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </h2>
      </div>
      {isExpanded && children}
    </div>
  );
}
