import React from 'react';

interface CategoryTypesProps {
  tags: Tag[];
  selectedTags: string[];
  onTagChange: (tagName: string) => void;
}

const CategoryTypes: React.FC<CategoryTypesProps> = ({
  tags,
  selectedTags,
  onTagChange,
}) => {
  return (
    <>
      {tags.map((tag) => (
        <div className="row y-gap-10 items-center justify-between" key={tag.id}>
          <div className="col-auto">
            <div
              className="form-checkbox d-flex items-center cursor-pointer"
              onClick={() => onTagChange(tag.name)}
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.name)}
                readOnly
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">
                {tag.name} {tag.count && `(${tag.count})`}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryTypes;
