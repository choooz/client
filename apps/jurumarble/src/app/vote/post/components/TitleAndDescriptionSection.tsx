import { Button } from "components/button";
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
    <>
      <H3>제목</H3>
      <TextArea
        placeholder="제목을 입력해주세요"
        value={title}
        name="title"
        onChange={onChangeVoteText}
      />
      <H3>설명</H3>
      <TextArea
        placeholder="설명을 입력해주세요"
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
    </>
  );
}

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

export default TitleAndDescriptionSection;
