import styled from "styled-components";
import { useRegisterContext } from "../contexts";
import Image from "next/image";
import { GENDER_LIST } from "lib/constants";

export const RegisterGenderSection = () => {
  const { gender, onChangeGender } = useRegisterContext();

  return (
    <Wrapper>
      {GENDER_LIST.map((item) => (
        <Item
          key={item.id}
          $width={gender === null ? 50 : gender === item.id ? 70 : 30}
          $selected={gender === item.id}
          onClick={() => onChangeGender(item.id)}
        >
          <Image alt="남성" height={100} src={item.src} />
          {item.label}
        </Item>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  > div + div {
    margin-left: 15px;
  }
`;

const Item = styled.div<{
  $width: number;
  $selected: boolean;
}>`
  border-radius: 12px;
  height: 280px;
  background: ${({ theme, $selected }) =>
    $selected ? "rgba(255, 92, 0, 0.50)" : theme.colors.white};

  cursor: pointer;
  display: flex;
  transition: width 0.3s ease-in-out;
  flex-direction: column;
  align-items: center;
  width: ${({ $width }) => ($width ? $width : 0)}%;
  border: 1px solid ${({ theme }) => theme.colors.line_01};
  > img {
    padding: 64px 0 72px;
    box-sizing: content-box;
  }
`;
