import { media } from "@chooz/ui/styles/media";
import NumberOfSolver from "components/common/NumberOfSolver";
import TargetMessage from "components/common/TargetMessage";
import Image from "next/image";
import { BookmarkIcon } from "public/icons";
import { Eximg1, Eximg2 } from "public/images";
import styled from "styled-components";

function VoteItem() {
  return (
    <Container>
      <ImageContainer>
        <Image alt="left image" src={Eximg1} style={LeftImageCss} />
        <Image alt="right image" src={Eximg2} style={RightImageCss} />
      </ImageContainer>
      <VoteInfo>
        <MessageContainer>
          <TargetMessage>이 고민을 찾고있는 분이에요!</TargetMessage>
          <NumberOfSolver>🔥3,645명 해결중!</NumberOfSolver>
        </MessageContainer>
        <BookmarkIconStyled />
      </VoteInfo>
      <TitleContainer>
        <VoteTitle>무엇이 좋을까요? 공백포함 22자까지입니...</VoteTitle>
        <Date>11h</Date>
      </TitleContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  ${({ theme }) => theme.textStyle.Font_Minimum}
  ${media.medium} {
    height: 360px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  max-width: 560px;
  margin: 0 auto;
  ${media.medium} {
    width: 560px;
  }
  /*  @todo 음영효과 추가
  ::after {
    content: "";
    z-index: 99;
    background-image: linear-gradient(to top, rgba(17, 17, 17, 0.6) 50%, rgba(17, 17, 17, 0) 18%);
    width: 100px;
    height: 100px;
  } */
`;

const LeftImageCss = {
  width: "50%",
  height: "100%",
  borderRadius: 8,
  marginRight: 1,
};

const RightImageCss = {
  width: "50%",
  height: "100%",
  borderRadius: 8,
  marginLeft: 1,
};

const VoteInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  ${media.medium} {
    width: 521px;
    margin: 0 auto;
    position: relative;
    bottom: 72px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
`;

const BookmarkIconStyled = styled(BookmarkIcon)`
  margin-left: 14px;
  path {
    fill: ${({ theme }) => theme.palette.main.point};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${media.medium} {
    width: 528px;
    margin: 0 auto;
    position: relative;
    bottom: 66px;
  }
`;

const VoteTitle = styled.h3`
  font-weight: 700;
  ${({ theme }) => theme.textStyle.Font_Regular}
  ${media.medium} {
    color: ${({ theme }) => theme.palette.ink.lightest};
    ${({ theme }) => theme.textStyle.Title_Small}
  }
`;

const Date = styled.span`
  color: ${({ theme }) => theme.palette.ink.light};
  ${({ theme }) => theme.textStyle.Font_Regular}
  ${media.medium} {
    color: ${({ theme }) => theme.palette.ink.lightest};
  }
`;

export default VoteItem;
