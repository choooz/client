import { media } from "@chooz/ui/styles/media";
import styled from "styled-components";
import { useState } from "react";
import { CategoryNameType, IMAGE_CATEGORY_LIST } from "types/vote";
import CategoryItem from "./CategoryItem";

function CategoryContainer() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryNameType | null>(null);

  const onClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.name as CategoryNameType;
    setSelectedCategory(category);
  };
  return (
    <Section>
      {IMAGE_CATEGORY_LIST.map(({ image, value, label }) => (
        <CategoryItem
          key={`search_category_page_${value}`}
          image={image}
          value={value}
          label={label}
          selectedCategory={selectedCategory}
          onClickCategory={onClickCategory}
        />
      ))}
    </Section>
  );
}

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
  margin-top: 24px;
  max-width: 588px;

  ${media.medium} {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px 16px;
    margin-top: 40px;
  }
`;

export default CategoryContainer;
