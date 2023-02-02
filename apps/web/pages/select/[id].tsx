import { FloatModalTemplate } from "@chooz/ui";
import { media } from "@chooz/ui/styles/media";
import AddDetailModal from "components/select/AddDetailModal";
import useOutSideClick from "hooks/useOutsideClick";
import useToggle from "hooks/useToggle";
import Image from "next/image";
import { HambergerIcon, SaveIcon } from "public/icons";
import { Eximg1, Eximg2, Success } from "public/images";
import React from "react";
import useModifyVoteService from "services/useModifyVoteService";
import styled from "styled-components";

function SelectPage() {
  const [toggleDetail, onChangeToggleDetail] = useToggle(true);
  const [toggleFirst, onChangeToggleFirst] = useToggle(true);
  const [toggleMenu, onChangeToggleMenu] = useToggle(false);
  const { onChangeVote, onChangeVoteByClick, mutateVote, vote } = useModifyVoteService();
  const { targetEl } = useOutSideClick(toggleMenu, onChangeToggleMenu);
  return (
    <PageWrapper>
      <PageInner>
        <button onClick={onChangeToggleDetail}>asdasd</button>
        <TagRow>
          <FlexRow>
            <div>3645명 해결중!</div>
            <div>당신을 기다렸어요</div>
          </FlexRow>
          <div>22.02.03</div>
        </TagRow>
        <TitleRow>
          <div>무엇이 좋을까요? 공백포함 34자 정도까지네요 여기까지입니다요</div>
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
            <Image src={Eximg1} width={272} height={340} alt="A 이미지" />
            <SmallTitle>아이보리 트위드</SmallTitle>
          </div>
          <div>
            <Image src={Eximg2} width={272} height={340} alt="B 이미지" />
            <SmallTitle>핑크 원피스</SmallTitle>
          </div>
        </ImageWrapper>
        <AddDescriptionButton>﹢</AddDescriptionButton>
      </PageInner>
      {toggleFirst && (
        <FloatModalTemplate onToggleModal={onChangeToggleFirst}>
          <Image alt="체크" src={Success} width={56} height={56} />
          <GuideText>선택결정이 등록되었어요.</GuideText>
        </FloatModalTemplate>
      )}
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
  width: 100%;
`;

const PageInner = styled.div`
  position: relative;
  margin: 0 auto;
  border-radius: 4px;
  height: 558px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 30px;
  ${media.medium} {
    height: 717px;
    padding: 40px;
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
  background-color: ${({ theme }) => theme.palette.background.white};
  color: ${({ theme }) => theme.palette.ink.dark};
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
  top: 106px;
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
