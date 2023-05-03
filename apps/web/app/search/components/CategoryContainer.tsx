import { media } from "@chooz/ui/styles/media";
import styled from "styled-components";
import { IMAGE_CATEGORY_LIST } from "lib/constants";
import { useState } from "react";
import { CategoryNameType } from "types/vote";
import CategoryItem from "./CategoryItem";

// @Todo 공통 컴포넌트로 묶을 수 있다면 묶기
function CategoryContainer() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryNameType | null>(null);

  const onChangeSelectedCategory = (category: CategoryNameType | null) => {
    setSelectedCategory(category);
  };

  const onClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.name as CategoryNameType;
    selectedCategory === category
      ? onChangeSelectedCategory(null)
      : onChangeSelectedCategory(category);
  };
  return (
    <CategorySection>
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
    </CategorySection>
  );
}

const CategorySection = styled.section`
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
