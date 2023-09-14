import { Button } from "components/button";
import { Input } from "components/input";
import { SvgIcX } from "src/assets/icons/components";
import SvgIcSearch from "src/assets/icons/components/IcSearch";
import styled, { css, useTheme } from "styled-components";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function SearchInput({ value, onChange, placeholder }: Props) {
  const theme = useTheme();
  return (
    <Search>
      <InputStyled
        width="100%"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></InputStyled>
      <SearchButton>
        <SvgIcSearch width={22} height={22} fill={theme.colors.black_04} />
        {/* <SvgIcX width={18} height={18} color="#CCCCCC" /> */}
      </SearchButton>
    </Search>
  );
}

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
