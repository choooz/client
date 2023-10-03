"use client";

import { Button } from "components/button";
import { Input } from "components/input";
import { FormEvent, forwardRef, MouseEvent } from "react";
import { SvgIcX } from "src/assets/icons/components";
import SvgIcSearch from "src/assets/icons/components/IcSearch";
import styled, { css, useTheme } from "styled-components";

/**
 * @TODO 리팩토링 필요
 * 이정도면 도메인에 따라 분리하는게 나을까?
 */

interface Props {
  value: string;
  onChange?: (keyword: string) => void;
  placeholder?: string;
  eventHandler?: (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => void;
}

const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, placeholder, eventHandler }, ref) => {
    const theme = useTheme();
    return (
      <Search
        onSubmit={(e) => {
          e.preventDefault();
          eventHandler?.(e);
        }}
      >
        <InputStyled
          ref={ref}
          width="100%"
          defaultValue={value}
          // onReset
          placeholder={placeholder}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
        ></InputStyled>
        <SearchButton onClick={eventHandler}>
          <SvgIcSearch width={22} height={22} fill={theme.colors.black_04} />
          {/* <SvgIcX
            width={18}
            height={18}
            color="#CCCCCC"
             * @TODO ref로 처리하는 방법 알아보기
             *
            onClick={() => {
              if (ref) {
                ref.value = "";
              }
            }}
          /> */}
        </SearchButton>
      </Search>
    );
  },
);

const Search = styled.form`
  display: flex;
  margin-top: 8px;
  width: 100%;
`;

const InputStyled = styled(Input)`
  ${({ theme }) => css`
    ${theme.typography.body02}
    background-color: ${theme.colors.bg_02};
    width: 100%;
    height: 44px;
    padding: 10px 12px;
    border-radius: 8px 0 0 8px;
    ::placeholder {
      color: ${theme.colors.black_05};
    }
  `}
`;

const SearchButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.bg_02};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 8px 8px 0;
    width: 44px;
    height: 44px;
    padding-right: 10px;
  `}
`;

export default SearchInput;
