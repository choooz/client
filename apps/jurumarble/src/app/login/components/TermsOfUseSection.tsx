import { transitions } from "lib/styles";
import styled, { css } from "styled-components";

function TermsOfUseSection() {
  return (
    <TermsOfUse>
      주루마블은 <Bold>만 19세 이상</Bold>부터 회원가입이 가능합니다.
      <br />
      <br />
      계속하면 당사의 <ClickText>서비스 약관</ClickText>에 동의하고,
      <br />
      <ClickText>개인정보 보호정책</ClickText>을(를) 읽어 당사의 데이터 수집, 사용,
      <br />
      공유 방법을 확인했음을 인정하는 것입니다.
    </TermsOfUse>
  );
}

const TermsOfUse = styled.p`
  ${({ theme }) => css`
    ${theme.typography.body03};
    color: ${theme.colors.black_03};
    margin-top: 32px;
    text-align: center;
    animation: ${transitions.delaypopInFromBottom} 2.8s normal ease-in-out;
  `};
`;

const Bold = styled.span`
  font-weight: bold;
`;

const ClickText = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;

export default TermsOfUseSection;
