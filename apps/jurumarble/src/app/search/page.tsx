"use client";

import BottomBar from "components/BottomBar";
import SvgIcPrev from "src/assets/icons/components/IcPrev";
import SvgIcX from "src/assets/icons/components/IcX";
import styled, { css } from "styled-components";

function Search() {
  return (
    <Container>
      <SearchBox>
        <SvgIcPrev width={24} height={24} />

        <SearchInput placeholder="관심있는 술을 검색해보세요." />
        <ResetIconBox>
          <SvgIcX width={18} height={18} color="#CCCCCC" />
        </ResetIconBox>
      </SearchBox>

      <BottomBar />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const SearchBox = styled.div`
  position: relative;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0px 16px 32px 0px rgba(235, 235, 235, 0.6);
`;

const SearchInput = styled.input`
  flex: 1;
  border-radius: 8px;
  border: none;
  padding: 12px;
  &:focus {
    outline: none;
  }
  ${({ theme }) => css`
    ${theme.typography.body02};
    background-color: ${theme.colors.bg_02};
    color: ${theme.colors.black_01};
    &::placeholder {
      color: ${theme.colors.black_05};
    }
  `}
`;

const ResetIconBox = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Search;
