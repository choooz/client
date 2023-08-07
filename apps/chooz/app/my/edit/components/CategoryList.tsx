import { Button, transitions } from "@monorepo/ui";
import { media } from "@monorepo/ui/styles/media";
import Image from "next/image";
import { CheckRound } from "public/images";
import styled, { css } from "styled-components";
import { IMAGE_CATEGORY_LIST } from "types/vote";

interface Props {
  categoryList: string[];
  onClickCategory: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function CategoryList({ categoryList, onClickCategory }: Props) {
  return (
    <Container>
      {IMAGE_CATEGORY_LIST.map(({ image, value, label }) => (
        <Category
          width="49%"
          height="104px"
          borderRadius="10px"
          key={`profile_edit_page_${value}`}
          selected={categoryList.includes(value)}
          onClick={onClickCategory}
          name={value}
        >
          <Image alt="항목" src={image} height={32} />
          <CategoryText>
            {categoryList.includes(value) && (
              <CheckBoxWrapper>
                <Image alt="선택" src={CheckRound} width={16} />
              </CheckBoxWrapper>
            )}
            {label}
          </CategoryText>
        </Category>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 9px;
  ${media.medium} {
    gap: 14px 16px;
  }
`;

const Category = styled(Button)<{ selected: boolean }>`
  position: relative;
  width: 100%;
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

export default CategoryList;
