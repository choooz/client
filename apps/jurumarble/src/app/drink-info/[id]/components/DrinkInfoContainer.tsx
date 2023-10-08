import { useQuery } from "@tanstack/react-query";
import { Button } from "components/button";
import Chip from "components/Chip";
import VoteHeader from "components/VoteHeader";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import useDrinkStampService from "services/useDrinkStampService";
import { SvgHeaderSearch, SvgIcPrevious, SvgStamp } from "src/assets/icons/components";
import styled, { css, useTheme } from "styled-components";
import useDrinkLoadService from "../services/useDrinkLoadService";

const DrinkInfoContainer = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { data, isError, isLoading } = useDrinkLoadService(Number(id));

  const { isStampedDrink, postDrinkEnjoy } = useDrinkStampService(Number(id));

  const { colors } = useTheme();
  const stampColor = isStampedDrink?.enjoyed ? colors.main_01 : colors.black_05;

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;
  if (!data) return <div>no data...</div>;

  const {
    name,
    image,
    manufacturer,
    manufactureAddress,
    rawMaterial,
    alcoholicBeverage,
    capacity,
    drinkId,
    enjoyCount,
    price,
    type,
  } = data;

  return (
    <>
      <Container>
        <VoteHeader
          leftButton={
            <PreviousButton onClick={() => router.back()}>
              <SvgIcPrevious width={24} height={24} />
            </PreviousButton>
          }
          rightButton={
            <PreviousButton onClick={() => router.back()}>
              <SvgHeaderSearch width={24} height={24} />
            </PreviousButton>
          }
        >
          {name}
        </VoteHeader>
      </Container>

      <ImageWrapper>
        <Image
          src={image}
          alt="image"
          width={370}
          height={320}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </ImageWrapper>
      <Container>
        <FlexBetweenRow>
          <FlexRow>
            <Chip variant="region">{manufactureAddress.slice(0, 2)}</Chip>
            <Chip variant="numberOfParticipants">{enjoyCount}명이 즐겼어요</Chip>
          </FlexRow>
          <SvgStamp
            onClick={() => postDrinkEnjoy(Number(id))}
            width={24}
            height={24}
            fill={stampColor}
          />
        </FlexBetweenRow>
        <TitleBox>
          <div className="title">{name}</div>
          <div className="manufacturer">{manufacturer}</div>
        </TitleBox>
        <DescriptionBox>
          <DescriptionRow>
            <div className="label">도수</div>
            <div className="content">{alcoholicBeverage}도</div>
          </DescriptionRow>
          <DescriptionRow>
            <div className="label">주종</div>
            <div className="content">{type}</div>
          </DescriptionRow>
          <DescriptionRow>
            <div className="label">원재료</div>
            <div className="content">{rawMaterial}</div>
          </DescriptionRow>
          <DescriptionRow>
            <div className="label">가격</div>
            <div className="content">{price}원</div>
          </DescriptionRow>
          <DescriptionRow>
            <div className="label">양조장 주소</div>
            <div className="content">{manufactureAddress}도</div>
          </DescriptionRow>
        </DescriptionBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 0 20px;
`;

const PreviousButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`;

const ImageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 400px;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const FlexBetweenRow = styled.div`
  padding: 20px 0 32px 0;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`;

const TitleBox = styled.div`
  padding-bottom: 32px;
  .title {
    ${({ theme }) => theme.typography.headline02};
    color: ${({ theme }) => theme.colors.black_01};
    padding-bottom: 8px;
  }
  .manufacturer {
    ${({ theme }) => theme.typography.subhead02};
    color: ${({ theme }) => theme.colors.black_03};
  }
  border-bottom: 1px solid ${({ theme }) => theme.colors.line_01};
`;

const DescriptionBox = styled.div`
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DescriptionRow = styled.div`
  display: flex;
  gap: 16px;
  .label {
    white-space: nowrap;
    width: 64px;
    min-width: 64px;
    ${({ theme }) => theme.typography.body_long03};
    color: ${({ theme }) => theme.colors.black_03};
  }

  .content {
    ${({ theme }) => theme.typography.body_long03};
    color: ${({ theme }) => theme.colors.black_01};
  }
`;
export default DrinkInfoContainer;
