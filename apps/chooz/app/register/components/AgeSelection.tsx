import { RegisterTemplate, transitions } from "@monorepo/ui";
import { Arm } from "public/images";
import { media } from "@monorepo/ui/styles/media";
import Image from "next/image";
import styled from "styled-components";
import { UserInfo } from "types/user";

interface Props {
  userInfo: UserInfo;
  onChangeProgress(number: number): void;
  onChangeAge: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDeleteAge: () => void;
  onToggleWarningModal: () => void;
}

const NuberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function AgeSelection({
  userInfo,
  onChangeProgress,
  onChangeAge,
  onDeleteAge,
  onToggleWarningModal,
}: Props) {
  return (
    <RegisterTemplate
      welcomeText={
        <>
          <Image src={Arm} alt="캐릭터" width={30} />몇 살인가요?
        </>
      }
      question="Lv.3 당신의&nbsp나이는?"
      search="나이"
      nextButtonText="다음"
      nextButtonProps={{
        onClick: onToggleWarningModal,
        disabled: !userInfo.age,
      }}
      prevButtonText="이전"
      prevButtonProps={{
        onClick: () => onChangeProgress(-1),
      }}
    >
      <Container>
        <InputBox>
          <Input type="text" inputMode="none" placeholder="0" value={userInfo.age ?? ""} />세
        </InputBox>
        <NumberBox>
          {NuberPad.map((number) => (
            <NumberDiv key={number} onClick={onChangeAge}>
              {number}
            </NumberDiv>
          ))}
          <DeleteNumver onClick={onDeleteAge}>전체 지움</DeleteNumver>
        </NumberBox>
      </Container>
    </RegisterTemplate>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 0 auto;
  width: 162px;
  gap: 16px;
  ${media.medium} {
    margin: 0;
    justify-content: space-between;
    flex-direction: row;
    align-items: unset;
  }
`;

const InputBox = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  font-weight: 700;
  ${({ theme }) => theme.textStyle.Title_2}
  ${media.medium} {
    height: 80px;
    font-size: 50px;
    gap: 12px;
  }
`;

const Input = styled.input`
  padding: 10px;
  width: 105px;
  height: 56px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  border-radius: 4px;
  animation: ${transitions.fadeIn} 1.5s normal ease-in-out;
  color: ${({ theme }) => theme.palette.main.point};
  ::placeholder {
    color: ${({ theme }) => theme.palette.ink.lighter};
  }
  ${media.medium} {
    width: 152px;
    height: 80px;
  }
`;

const NumberBox = styled.div`
  width: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  place-items: center;
  ${media.medium} {
    gap: 12px;
    margin-left: 20px;
  }
`;

const NumberDiv = styled.button`
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  background: ${({ theme }) => theme.palette.background.soft};
  ${media.medium} {
    width: 70px;
    height: 70px;
    font-size: 28px;
  }
  :active {
    border: 1px solid ${({ theme }) => theme.palette.main.point};
    background-color: ${({ theme }) => theme.palette.background.selected};
  }
`;

const DeleteNumver = styled(NumberDiv)`
  font-size: 14px;
  width: 105px;
  grid-column: span 2;
  ${media.medium} {
    font-size: 24px;
    width: 152px;
  }
`;
export default AgeSelection;
