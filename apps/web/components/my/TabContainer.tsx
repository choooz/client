import { useState } from "react";
import styled, { css } from "styled-components";

interface Params {
  tabList: {
    id: string;
    name: string;
  }[];
  selectedTab: string;
  onClickSelectedTab: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function TabContainer({ tabList, selectedTab, onClickSelectedTab }: Params) {
  return (
    <TabList>
      {tabList.map(({ id, name }) => (
        <SelectedButton
          key={`tab_${id}`}
          value={id}
          onClick={onClickSelectedTab}
          selected={id === selectedTab}
        >
          {name}
        </SelectedButton>
      ))}
    </TabList>
  );
}

const TabList = styled.div`
  display: flex;
  max-width: 640px;
  margin: 0 auto;
`;

const SelectedButton = styled.button<{ selected: boolean }>`
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  width: 100%;
  height: 50px;
  border-radius: 10px 10px 0 0;
  z-index: 9;
  ${({ selected, theme }) =>
    selected
      ? css`
          background-color: ${theme.palette.background.white};
          color: ${theme.palette.ink.darker};
        `
      : css`
          color: ${theme.palette.ink.light};
          background-color: ${theme.palette.background.myPageInactve};
        `};
`;

export default TabContainer;
