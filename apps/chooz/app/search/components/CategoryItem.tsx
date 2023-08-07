import { Button, transitions } from "@chooz/ui";
import Path from "lib/Path";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { CheckRound } from "public/images";
import styled, { css } from "styled-components";
import { CategoryNameType } from "types/vote";

interface Props {
  image: StaticImageData;
  value: string;
  label: string;
  selectedCategory: CategoryNameType | null;
  onClickCategory: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// @Todo 공통 컴포넌트로 묶을 수 있다면 묶기
function CategoryItem({ image, value, label, selectedCategory, onClickCategory }: Props) {
  return (
    <Link href={`${Path.CATEGORY_PAGE}${value}`}>
      <Category
        width="100%"
        height="104px"
        borderRadius="10px"
        selected={selectedCategory === value}
        onClick={onClickCategory}
        name={value}
      >
        <Image alt="항목" src={image} height={32} />
        <CategoryText>
          {selectedCategory === value && (
            <CheckBoxWrapper>
              <Image alt="선택" src={CheckRound} width={16} />
            </CheckBoxWrapper>
          )}
          {label}
        </CategoryText>
      </Category>
    </Link>
  );
}

const Category = styled(Button)<{ selected: boolean }>`
  position: relative;
  flex-direction: column;
  gap: 8px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.palette.background.soft};
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  ${({ theme }) => theme.textStyle.Title_Small};
  ${({ theme, selected }) =>
    selected &&
    css`
      animation: ${transitions.blink} 0.7s ease-in-out;
      background-color: ${theme.palette.background.selected};
      border: 1px solid ${theme.palette.main.point};
      font-weight: 700;
    `}
`;

const CategoryText = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
`;

const CheckBoxWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export default CategoryItem;
