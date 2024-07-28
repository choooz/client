import styled, { css, DefaultTheme } from 'styled-components';

import { TAB_LIST, TabList } from '../constants';
import { useSearchChangeContext, useSearchValueContext } from '../context';

function Tabs() {
  const { selectedTab } = useSearchValueContext();
  const { onClickSelectedTab } = useSearchChangeContext();

  return (
    <TabBox>
      {TAB_LIST.map(({ id, name }) => (
        <SelectedButton
          key={`tab_${id}`}
          value={id}
          selected={id === selectedTab}
          onClick={(e) => onClickSelectedTab(e.currentTarget.value as TabList)}
        >
          {name}
        </SelectedButton>
      ))}
    </TabBox>
  );
}

const TabBox = styled.ul`
  display: flex;
  margin-top: 8px;
`;

const SelectedButton = styled.button<{
  theme: DefaultTheme;
  selected: boolean;
}>`
  ${({ theme, selected }) =>
    css`
      ${theme.typography.body02};
      color: ${theme.colors.black_03};
      padding: 16.5px 12px;

      ${selected
        ? css`
            ${theme.typography.body01};
            color: ${theme.colors.black_01};
            border-bottom: 3px solid ${theme.colors.black_01};
          `
        : css`
            display: flex;
          `}
    `}
`;

export default Tabs;
