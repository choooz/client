import { Button } from "components/button";
import { transitions } from "lib/styles";
import styled, { css, useTheme } from "styled-components";

interface Props {
  title: string;
  detail: string;
  onChangeVoteText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isCompleted: boolean;
  onClickPostVoteComplete: () => void;
}

function TitleAndDescriptionSection({
  title,
  detail,
  onChangeVoteText,
  isCompleted,
  onClickPostVoteComplete,
}: Props) {
  return (
    <AnimationBoundary>
      <H3>
        투표 제목을 작성해주세요.<MainColor>*</MainColor>
      </H3>
      <TextArea
        placeholder="질문을 입력해주세요"
        value={title}
        name="title"
        onChange={onChangeVoteText}
      />
      <H3>추가적인 설명이 필요하면 작성해주세요.</H3>
      <TextArea
        placeholder="내용을 입력해주세요"
        value={detail}
        name="detail"
        onChange={onChangeVoteText}
      />
      <CompleteButton
        width="100%"
        height="56px"
        variant="primary"
        disabled={isCompleted}
        onClick={onClickPostVoteComplete}
      >
        등록 완료
      </CompleteButton>
    </AnimationBoundary>
  );
}

const AnimationBoundary = styled.div`
  /**
    * @TODO 뭔가 이상하다
   */
  h3:nth-child(1) {
    animation: ${transitions.slideUp} 0.3s ease-in-out;
  }
  textarea:nth-child(2) {
    animation: ${transitions.slideUp} 0.6s ease-in-out;
  }
  h3:nth-child(3) {
    animation: ${transitions.slideUp} 0.9 ease-in-out;
  }
  textarea:nth-child(4) {
    animation: ${transitions.slideUp} 1.2 ease-in-out;
  }
  button:nth-child(5) {
    animation: ${transitions.slideUp} 1.5s ease-in-out;
  }
`;

const H3 = styled.h3`
  ${({ theme }) =>
    css`
      ${theme.typography.headline04}
      margin-top: 32px;
    `}
`;

const TextArea = styled.textarea`
  ${({ theme }) =>
    css`
      border: 1px solid ${theme.colors.line_01};
      margin-top: 12px;
      border-radius: 4px 0px 0px 4px;
      resize: none;
      width: 100%;
      height: 102px;
      padding: 14px;
      ::placeholder {
        ${theme.typography.body03}
        color: ${theme.colors.black_04};
      }
    `}
`;

const CompleteButton = styled(Button)`
  ${({ theme }) => css`
    ${theme.typography.body01}
    margin-top: 52px;
    :disabled {
      background-color: ${theme.colors.black_05};
      color: ${theme.colors.black_03};
    }
  `}
`;

const MainColor = styled.span`
  ${({ theme }) => `
    color: ${theme.colors.main_01};
  `}
`;

export default TitleAndDescriptionSection;
