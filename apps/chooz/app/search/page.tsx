"use client";

import styled from "styled-components";
import CategoryContainer from "./components/CategoryContainer";
import SearchContainer from "./components/SearchContainer";

function SearchPage() {
  return (
    <PageWrapper>
      <PageInner>
        <SearchContainer />
        <CategoryContainer />
      </PageInner>
    </PageWrapper>
  );
}

const PageWrapper = styled.div``;

const PageInner = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 588px;
`;

export default SearchPage;
