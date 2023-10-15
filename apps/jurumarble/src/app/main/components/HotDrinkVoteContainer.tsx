import Path from "lib/Path";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";
import useGetHotDrinkVoteService from "../services/useGetHotDrinkVoteService";

function HotDrinkVoteContainer() {
  const router = useRouter();

  const { hotDrinkVote } = useGetHotDrinkVoteService();
  if (!hotDrinkVote) {
    return null;
  }
  const { voteId, voteTitle, drinkAImage, drinkBImage } = hotDrinkVote;

  const nowTime = new Date().getHours();

  return (
    <>
      <H2>
        우리술
        <Main01Color> 투표</Main01Color>
      </H2>
      <H3>{nowTime}시, 지금 가장 인기있는 우리술 투표에요.</H3>
      <PopularVoteCard onClick={() => router.push(`${Path.VOTE_DETAIL_PAGE}/${voteId}`)}>
        <VoteImages>
          <DrinkImageBox color="orange">
            <DrinkImageWrapper>
              <Image alt="A 이미지" src={drinkAImage} fill style={{ borderRadius: "80px" }} />
            </DrinkImageWrapper>
          </DrinkImageBox>
          <DrinkImageBox color="mint">
            <DrinkImageWrapper>
              <Image alt="B 이미지" src={drinkBImage} fill style={{ borderRadius: "80px" }} />
            </DrinkImageWrapper>
          </DrinkImageBox>
        </VoteImages>
        <VoteTitleWrapper>
          <VoteTitle>{voteTitle}</VoteTitle>
        </VoteTitleWrapper>
      </PopularVoteCard>
    </>
  );
}

const H2 = styled.h2`
  ${({ theme }) =>
    css`
      ${theme.typography.headline01};
      margin-top: 40px;
    `}
`;

const Main01Color = styled.span`
  color: ${({ theme }) => theme.colors.main_01};
`;

const H3 = styled.h3`
  ${({ theme }) =>
    css`
      ${theme.typography.subhead01};
      color: ${theme.colors.black_02};
      margin-top: 8px;
    `}
`;

const PopularVoteCard = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors.bg_02};
      width: auto;
      margin-top: 32px;
      overflow: auto;
      border: 1px solid ${theme.colors.bg_02};
      border-radius: 16px;
      box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 10px 25px 0px rgba(0, 0, 0, 0.06);
      cursor: pointer;
    `}
`;

const VoteImages = styled.div`
  display: flex;
  width: auto;
  height: 120px;
  gap: 11px;
  margin: 20px;
`;

const DrinkImageBox = styled.div<{ color: string }>`
  ${({ theme, color }) =>
    css`
      background-color: ${color === "orange" ? theme.colors.sub_01 : theme.colors.sub_02};
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      border-radius: 10px;
    `}
`;

const DrinkImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
`;

const VoteTitleWrapper = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors.white};
      padding: 20px 0;
    `}
`;

const VoteTitle = styled.div`
  ${({ theme }) =>
    css`
      ${theme.typography.headline03};
      color: ${theme.colors.black_01};
      padding: 0 20px;
    `}
`;
export default HotDrinkVoteContainer;
