import AorBMark from 'components/AorBMark';
import Path from 'lib/Path';
import { media } from 'lib/styles';
import depths from 'lib/styles/depths';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ExImg1 } from 'public/images';
import { SvgIcCheck } from 'src/assets/icons/components';
import styled, { css } from 'styled-components';

type AorB = 'A' | 'B';
type ActiveType = 'active' | 'inactive' | null;
type Direction = 'left' | 'right';

// const safeImageA = useMemo(() => {
//   if (!imageA || imageA === "string") return EmptyAImg;
//   return imageA;
// }, [imageA]);
// const safeImageB = useMemo(() => {
//   if (!imageB || imageB === "string") return EmptyAImg;
//   return imageB;
// }, [imageB]);

const getSafeImage = (image: string) =>
  image.includes('http') ? image : ExImg1;

interface Props {
  titleA: string;
  titleB: string;
  imageA: string;
  imageB: string;
  select: AorB | null;
  percentageA: number;
  percentageB: number;
  totalCountA: number;
  totalCountB: number;
  onMutateVoting: (select: AorB) => void;
  voteType: string;
  drinkAId: number;
  drinkBId: number;
  enlargement?: AorB;
}

function VoteDescription({
  titleA,
  titleB,
  imageA,
  imageB,
  select,
  percentageA,
  percentageB,
  totalCountA,
  totalCountB,
  onMutateVoting,
  voteType,
  drinkAId,
  drinkBId,
  enlargement,
}: Props) {
  const router = useRouter();

  const getAB = (direction: Direction) => {
    return direction === 'left' ? 'A' : 'B';
  };

  const activeValue = (direction: Direction): ActiveType => {
    if (!select) {
      return null;
    }
    return `${select === getAB(direction) ? '' : 'in'}active`;
  };

  const onClickVote = (chooz: AorB) => {
    if (!!select) {
      return;
    }
    onMutateVoting(chooz);
  };

  const onRouteDrinkInfo = () => {
    if (voteType !== 'DRINK') {
      return;
    }
    if (select === 'A') {
      router.push(`${Path.DRINK_INFO_PAGE}/${drinkAId}`);
    }
    if (select === 'B') {
      router.push(`${Path.DRINK_INFO_PAGE}/${drinkBId}`);
    }
  };

  return (
    <Container>
      <ImageWrapper onClick={onRouteDrinkInfo}>
        <LeftVote
          selected={activeValue('left')}
          onClick={() => onClickVote('A')}
          enlargement={enlargement === 'A'}
        >
          <VoteImageWrapper>
            <Image
              src={getSafeImage(imageA)}
              alt="A 이미지"
              width={160}
              height={160}
              style={{
                objectFit: 'cover',
                width: 'auto',
                height: '100%',
              }}
            />
            <div className="overlay">
              <OverLayTitle>{titleA}</OverLayTitle>
              <OverlayPercent>{percentageA}%</OverlayPercent>
              <OverlayCount> {totalCountA}명</OverlayCount>
              {voteType === 'DRINK' && (
                <OverlayButton>술 정보 &nbsp; {'>'}</OverlayButton>
              )}
            </div>
            <AorBMark AorB="A">A</AorBMark>
          </VoteImageWrapper>
        </LeftVote>

        <RightVote
          selected={activeValue('right')}
          onClick={() => onClickVote('B')}
          enlargement={enlargement === 'B'}
        >
          <VoteImageWrapper>
            <Image
              src={getSafeImage(imageB)}
              alt="B 이미지"
              width={160}
              height={160}
              style={{
                objectFit: 'cover',
                width: 'auto',
                height: '100%',
              }}
            />
            <div className="overlay">
              <OverLayTitle>{titleB}</OverLayTitle>
              <OverlayPercent>{percentageB}%</OverlayPercent>
              <OverlayCount> {totalCountB}명</OverlayCount>
              {voteType === 'DRINK' && (
                <OverlayButton>술 정보&nbsp; {'>'}</OverlayButton>
              )}
            </div>
            <AorBMark AorB="B">B</AorBMark>
          </VoteImageWrapper>
        </RightVote>
      </ImageWrapper>
      <FlexRow>
        <SmallTitle isSelect={select === 'A'}>
          {select === 'A' && <SvgIcCheck width={20} height={20} />}
          {titleA}
        </SmallTitle>
        <SmallTitle isSelect={select === 'B'}>
          {select === 'B' && <SvgIcCheck width={20} height={20} />}
          {titleB}
        </SmallTitle>
      </FlexRow>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  gap: 9px;
`;

const SmallTitle = styled.div<{ isSelect: boolean }>`
  ${({ theme, isSelect }) => css`
    ${theme.typography.body_long03}
    color: ${isSelect ? theme.colors.main_01 : theme.colors.black_01};
    border-bottom: 1px solid ${theme.colors.line_01};
    margin-top: 20px;
    padding: 4px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
  `};
`;

const FlexRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const variantStyles = {
  active: css`
    transition: all 0.3s ease-in-out;
    width: 70%;
    font-size: 16px;
    font-weight: 700;
    padding: 0 1px;
    pointer-events: none;
  `,
  inactive: css`
    width: 30%;
    pointer-events: none;
  `,
};

const typeGuardVariantStyle = (selected: ActiveType) => {
  if (!selected) {
    return null;
  }
  return variantStyles[selected];
};

const LeftVote = styled.div<{ selected: ActiveType; enlargement: boolean }>`
  position: relative;
  width: 50%;
  min-width: 10%;
  display: flex;
  transition: all 0.3s ease-in-out;
  justify-content: center;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: none;
    z-index: ${depths.overlay};
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 20px;
    color: white;
    background: rgba(250, 94, 45, 0.7);
    border-radius: 10px;
    border: 2px solid #ff4a16;
    ${({ selected }) =>
      selected === 'active' &&
      css`
        width: 100%;
        display: flex;
      `};
  }

  ${({ enlargement, selected }) =>
    enlargement &&
    !selected &&
    css`
      width: 90%;
    `}
  ${({ selected }) => typeGuardVariantStyle(selected)}
    &:hover {
    ${({ selected, enlargement }) =>
      !selected &&
      !enlargement &&
      css`
        width: 99%;
      `}
  }
`;

const RightVote = styled(LeftVote)`
  .overlay {
    align-items: flex-end;
    left: unset;
    right: 0;
  }
`;

const OverLayTitle = styled.div`
  ${({ theme }) => theme.typography.body01}
  padding-top: 26px;
`;

const OverlayPercent = styled.div`
  ${({ theme }) => theme.typography.headline01}
  padding-top: 8px;
`;

const OverlayCount = styled.div`
  ${({ theme }) => theme.typography.body03}
`;

const OverlayButton = styled.button`
  position: relative;
  ${({ theme }) =>
    css`
      ${theme.typography.caption_chip}
      background-color: ${theme.colors.main_01};
    `}
  display: flex;
  border-radius: 4px;
  margin-top: 8px;
  padding: 6px 8px;
  z-index: 100;
`;

const VoteImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 184px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  ${media.medium} {
    height: 250px;
  }
`;

export default VoteDescription;
