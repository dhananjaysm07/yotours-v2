'use client';
import React from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onSelectionChange: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onSelectionChange,
}) => {
  return (
    <>
      {tags.map((tag, idx) => (
        <div
          className="row y-gap-10 items-center justify-between"
          key={`tag-${idx}`}
        >
          <div className="col-auto">
            <div
              className="form-checkbox d-flex items-center cursor-pointer"
              onClick={() => onSelectionChange(tag)}
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                readOnly
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{tag}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TagFilter;
