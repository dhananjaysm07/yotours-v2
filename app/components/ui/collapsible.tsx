// components/ui/collapsible.tsx
'use client';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const Collapsible = ({
  title,
  children,
  defaultExpanded = false,
}: CollapsibleProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-t border-gray-200 py-4">
      <button
        aria-label="Expand/Collapse"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center text-xl font-medium"
      >
        {title}
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isExpanded && <div className="mt-4">{children}</div>}
    </div>
  );
};
