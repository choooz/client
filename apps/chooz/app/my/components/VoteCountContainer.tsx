import styled from "styled-components";
import useGetVoteCount from "../services/useGetVoteCount";

function VoteCountContainer() {
  const voteCountList = useGetVoteCount();

  return (
    <Container>
      {voteCountList.map(({ voteTypeText, count }) => {
        return (
          <VoteType key={`VoteCount_${voteTypeText}`}>
            <VoteCount>{count}</VoteCount>
            <VoteTypeText>{voteTypeText}</VoteTypeText>
          </VoteType>
        );
      })}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 24px;
`;

const VoteType = styled.div`
  display: flex;
  flex-direction: column;
`;

const VoteCount = styled.span`
  ${({ theme }) => theme.textStyle.Title_Large};
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
`;

const VoteTypeText = styled.span`
  color: ${({ theme }) => theme.palette.ink.light};
`;

export default VoteCountContainer;
