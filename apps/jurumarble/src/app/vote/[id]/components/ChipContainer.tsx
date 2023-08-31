import React from "react";
import SvgIcBookmark from "src/assets/icons/components/IcBookmark";
import SvgIcMenu from "src/assets/icons/components/IcMenu";
import styled from "styled-components";

const ChipContainer = () => {
  return (
    <>
      <TagRow>
        <FlexRow>
          <RegionTag>서울</RegionTag>
          <NormalTag>122명이 즐겼어요</NormalTag>
        </FlexRow>
        <FlexRow>
          <SvgIcBookmark width={18} height={20} />

          <SvgIcMenu width={20} height={20} />
        </FlexRow>
      </TagRow>
      <TitleRow>
        서울에서 유명한 술은??
        {/* <DateText>{date.slice(0, 10)}</DateText> */}
      </TitleRow>
      <DateText>23.05.01</DateText>
      <Description>
        아니 친구가 서울에서 풍정 소주가 유명하다는데 아무리 봐도 저는 옥지춘이 유명한거 같단
        말이죠~~~골라주세요!!
      </Description>
    </>
  );
};

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
  margin-top: 20px;
  ${({ theme }) => theme.typography.body01};
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.colors.black_04};
  ${({ theme }) => theme.typography.body_long03}
  text-align: right;
  margin: 8px 0;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 8px;
`;

const NormalTag = styled.div`
  padding: 10px 8px;
  ${({ theme }) => theme.typography.caption}
  background-color: ${({ theme }) => theme.colors.bg_01};
  color: ${({ theme }) => theme.colors.black_01};
  border-radius: 4px;
`;

const RegionTag = styled(NormalTag)`
  background-color: ${({ theme }) => theme.colors.main_02};
  color: ${({ theme }) => theme.colors.main_01};
`;

const Description = styled.div`
  padding-bottom: 20px;
  ${({ theme }) => theme.typography.body_long03}
  color: ${({ theme }) => theme.colors.black_02};
`;

export default ChipContainer;
