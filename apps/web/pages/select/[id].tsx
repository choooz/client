import { Button, FloatModalTemplate, transitions } from "@chooz/ui";
import { media } from "@chooz/ui/styles/media";
import NumberOfSolver from "components/common/NumberOfSolver";
import TargetMessage from "components/common/TargetMessage";
import AddDetailModal from "components/select/AddDetailModal";
import useOutSideClick from "hooks/useOutsideClick";
import useToggle from "hooks/useToggle";
import Image from "next/image";
import { HambergerIcon, SaveIcon } from "public/icons";
import { Eximg1, Eximg2, Success } from "public/images";
import React, { useEffect } from "react";
import useModifyVoteService from "services/useModifyVoteService";
import { useSubmitState } from "store/submitState";
import styled from "styled-components";

let timer: any;

function SelectPage() {

  const { isSubmit, onToggleisSubmit } = useSubmitState();
  const [toggleDetail, onChangeToggleDetail] = useToggle(false);
  const [toggleMenu, onChangeToggleMenu] = useToggle(false);
  const { onChangeVote, onChangeVoteByClick, mutateVote, vote } = useModifyVoteService();
  const { targetEl } = useOutSideClick(toggleMenu, onChangeToggleMenu);

  const onScrollFunction = (e: React.WheelEvent<HTMLDivElement>) => {
    // 휠을 올리면 className을 up로 변경하고, 1초뒤 다시 원래대로 변경
    if (e.deltaY < 0) {
      document.querySelector(".animate")?.classList.add("up");
      document.querySelector(".animate2")?.classList.add("up2");
      document.querySelector(".animate3")?.classList.add("up3");

      timer = setTimeout(() => {
        document.querySelector(".animate")?.classList.remove("up");
        document.querySelector(".animate2")?.classList.remove("up2");
        document.querySelector(".animate3")?.classList.remove("up3");
      }, 1500);
    }

    //  휠을 아래로 내리면 className을 prev로 변경하고, 1초뒤 다시 원래대로 변경
    if (e.deltaY > 0) {
      document.querySelector(".animate")?.classList.add("down");
      document.querySelector(".animate2")?.classList.add("down2");

      timer = setTimeout(() => {
        document.querySelector(".animate")?.classList.remove("down");
        document.querySelector(".animate2")?.classList.remove("down2");
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <PageWrapper>
      <PageInner className="animate" onWheel={onScrollFunction}>
        <TagRow>
          <FlexRow>
            <NumberOfSolver>🔥3,645명 해결중!</NumberOfSolver>
            <TargetMessage>이 고민을 찾고있는 분이에요!</TargetMessage>
          </FlexRow>
          <FlexRow>
            <Image src={SaveIcon} alt="저장하기" width={32} height={32} />
            <div ref={targetEl}>
              <Image
                src={HambergerIcon}
                alt="매뉴"
                width={32}
                height={32}
                onClick={onChangeToggleMenu}
              />
            </div>
          </FlexRow>
        </TagRow>
        <TitleRow>
          <div>무엇이 좋을까요? 공백포함 34자 정도까지네요 여기까지입니다요</div>
          <FlexRow>
            <div>22.02.03</div>
          </FlexRow>
          {toggleMenu && (
            <MenuBox>
              <MenuText className="modify" onClick={onChangeToggleDetail}>
                수정하기
              </MenuText>
              <MenuText className="delete">삭제하기</MenuText>
            </MenuBox>
          )}
        </TitleRow>
        <ImageWrapper>
          <div>
            <Image
              src={Eximg1}
              width={272}
              height={340}
              alt="A 이미지"
              style={{
                objectFit: "cover",
                width: "272px",
                height: "auto",
              }}
            />
            <SmallTitle>아이보리 트위드</SmallTitle>
          </div>
          <div>
            <Image
              src={Eximg2}
              width={272}
              height={340}
              alt="B 이미지"
              style={{
                objectFit: "cover",
                width: "272px",
                height: "auto",
              }}
            />
            <SmallTitle>핑크 원피스</SmallTitle>
          </div>
        </ImageWrapper>
        <AddDescriptionButton>﹢</AddDescriptionButton>
        <Button width="127px" height="48px" variant="primary" borderRadius="100px">
          자세히 보기
        </Button>
        {/* 자세히 보기 */}
      </PageInner>

      {isSubmit && (
        <FloatModalTemplate onToggleModal={onToggleisSubmit}>
          <Image alt="체크" src={Success} width={56} height={56} />
          <GuideText>선택결정이 등록되었어요.</GuideText>
        </FloatModalTemplate>
      )}
      <FirstPageBase className="animate2" />
      <SecondPageBase className="animate3" />
      {toggleDetail && (
        <AddDetailModal
          onToggleModal={onChangeToggleDetail}
          mutateVote={mutateVote}
          vote={vote}
          onChangeVote={onChangeVote}
          onChangeVoteByClick={onChangeVoteByClick}
        />
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  scrollbar-width: none;
  .up {
    transform-origin: 50% 0;
    perspective: 600px;
    transform: rotateX(-90deg) scale(0.9, 1.032);
    transition: all 0.5s ease-in-out;
    opacity: 0;
  }
  .up2 {
    transition: all 0.5s ease-in-out;
    perspective: 600px;
    transform-origin: 50% 0;
    transform: scale(1.11, 0.97);
    opacity: 1;
  }
  .up3 {
    transition: all 0.5s ease-in-out;
    perspective: 600px;
    transform-origin: 50% 0;
    transform: scale(1.11, 0.97);
    opacity: 0.6;
  }
  .down {
    transition: all 0.5s ease-in-out;
    transform: rotateX(90deg) scale(0.9, 1.032);
    transform-origin: 50% 100%;
    perspective: 600px;
    opacity: 0.5;
  }
  .down2 {
    transition: all 0.5s ease-in-out;
    perspective: 600px;
    transform-origin: 50% 0;
    opacity: 1;
  }
`;

const PageInner = styled.div`
  position: relative;
  margin: 0 auto;
  border-radius: 4px;
  height: 525px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
  z-index: 1000;
  ${media.medium} {
    height: 600px;
    padding: 40px;
  }
`;

const FirstPageBase = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 4px;
  width: 90%;
  max-width: 576px;
  height: 550px;
  opacity: 0.6;
  z-index: 500;
  ${media.medium} {
    height: 620px;
  }
`;

const SecondPageBase = styled(FirstPageBase)`
  width: 78%;
  max-width: 496px;
  height: 570px;
  opacity: 0.3;
  z-index: 500;
  ${media.medium} {
    height: 640px;
  }
`;

const TagRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
`;

const TitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0 11px 0;
  ${({ theme }) => theme.textStyle.Title_Small}
  color: ${({ theme }) => theme.palette.ink.dark};
  font-weight: 700;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;

const SmallTitle = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.base};
  padding: 4px;
`;

const AddDescriptionButton = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.ink.dark};
  color: ${({ theme }) => theme.palette.background.white};
  font-size: 45px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
`;

const FlexRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MenuBox = styled.div`
  position: absolute;
  top: 70px;
  right: 41px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.background.white};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
  .modify {
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.base};
  }
  .delete {
    color: ${({ theme }) => theme.palette.system.danger};
  }
`;

const MenuText = styled.div`
  padding: 12px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  z-index: 999;
  :hover {
    text-decoration: underline;
  }
`;

const GuideText = styled.div`
  color: ${({ theme }) => theme.palette.background.white};
  ${({ theme }) => theme.textStyle.Title_Large}
  font-weight: 700;
`;

export default SelectPage;
