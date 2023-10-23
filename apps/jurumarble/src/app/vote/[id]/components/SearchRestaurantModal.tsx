'use client';

import { useState } from 'react';

import VoteHeader from 'components/VoteHeader';
import { Button, ModalTemplate } from 'components/index';
import useInput from 'hooks/useInput';
import { RestaurantInfo } from 'lib/apis/restaurant';
import { REGION_LIST } from 'lib/constants';
import { transitions } from 'lib/styles';
import Image from 'next/image';
import SvgIcX from 'src/assets/icons/components/IcX';
import styled, { css, DefaultTheme } from 'styled-components';

import RestaurantItem from './RestaurantItem';
import SearchInput from './SearchInput';
import useRestaurantImageService from '../services/useRestaurantImageService';
import useRestaurantService from '../services/useRestaurantService';

interface Props {
  commentId: number;
  postId: number;
  region: string;
  onToggleSearchRestaurantModal: () => void;
}

function SearchRestaurantModal({
  commentId,
  postId,
  region,
  onToggleSearchRestaurantModal,
}: Props) {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantInfo | null>(null);
  const onClickSelectedRestaurant = (restaurantInfo: RestaurantInfo) => {
    setSelectedRestaurant((prev) =>
      restaurantInfo.contentId === prev?.contentId ? null : restaurantInfo,
    );
  };

  const { debouncedValue: searchText, onChange: onChangeSearchText } = useInput(
    {
      initialValue: '',
      useDebounce: true,
      debounceTimeout: 500,
    },
  );

  const regionValue = REGION_LIST.find((item) => item.label === region)?.value;
  const { restaurantList, subscribe } = useRestaurantService({
    commentId,
    commentType: 'votes',
    keyword: searchText,
    page: 1,
    region: regionValue,
    typeId: postId,
  });

  const [selectedImage, setSelectedImage] = useState('');
  const onClickSelectedImage = (imageUrl: string) => {
    selectedImage === imageUrl
      ? setSelectedImage('')
      : setSelectedImage(imageUrl);
  };

  const { restaurantImageList, postRestaurantImage } =
    useRestaurantImageService({
      commentType: 'votes',
      typeId: postId,
      commentId,
      contentId: selectedRestaurant?.contentId ?? '',
    });

  if (!restaurantList) {
    return null;
  }

  return (
    <ModalTemplate
      width="375px"
      height="100%"
      onToggleModal={onToggleSearchRestaurantModal}
    >
      <VoteHeader
        rightButton={
          <CloseButton onClick={onToggleSearchRestaurantModal}>
            <SvgIcX width={24} height={24} />
          </CloseButton>
        }
      >
        <TitleStyled>
          {selectedRestaurant ? '이미지 선택' : '음식점 검색'}
        </TitleStyled>
      </VoteHeader>
      <Container>
        {selectedRestaurant ? (
          <>
            <RestaurantItem
              restaurantInfo={selectedRestaurant}
              onClickSelectedRestaurant={onClickSelectedRestaurant}
            />
            <FoodImageList>
              <NonSelectedButton
                variant="outline"
                width="107px"
                height="60px"
                borderRadius="4px"
                onClick={() => onClickSelectedImage('nonSelect')}
              >
                <ColorBox selectedImage={selectedImage === 'nonSelect'} />
                선택 안함
              </NonSelectedButton>
              {restaurantImageList &&
                restaurantImageList.map((restaurantImage) => (
                  <FoodItem key={restaurantImage}>
                    <Button
                      name={restaurantImage}
                      onClick={() => onClickSelectedImage(restaurantImage)}
                    >
                      <ColorBox
                        selectedImage={selectedImage === restaurantImage}
                      />
                    </Button>
                    <Image
                      alt="음식 이미지"
                      src={restaurantImage}
                      width={107}
                      height={60}
                      style={{
                        borderRadius: '4px',
                      }}
                    />
                  </FoodItem>
                ))}
            </FoodImageList>
            <CompleteButton
              width="335px"
              height="56px"
              variant="primary"
              disabled={!selectedImage}
              onClick={() => {
                postRestaurantImage({
                  commentType: 'votes',
                  typeId: postId,
                  commentId,
                  restaurantName: selectedRestaurant.restaurantName,
                  restaurantImage: selectedImage,
                });
                onToggleSearchRestaurantModal();
              }}
            >
              완료
            </CompleteButton>
          </>
        ) : (
          <>
            <SearchInput
              placeholder="관심있는 음식점을 검색해보세요."
              value={searchText}
              onChangeSearchText={onChangeSearchText}
            />
            <RestaurantList>
              {restaurantList.map((restaurantInfo) => (
                <>
                  {restaurantInfo && (
                    <RestaurantItem
                      key={restaurantInfo.contentId}
                      restaurantInfo={restaurantInfo}
                      onClickSelectedRestaurant={onClickSelectedRestaurant}
                    />
                  )}
                </>
              ))}
              <div ref={subscribe} />
            </RestaurantList>
          </>
        )}
      </Container>
    </ModalTemplate>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;

const TitleStyled = styled.div`
  margin-top: 14px;
`;

const CloseButton = styled(Button)`
  margin: 14px 12px 0 0;
`;

const RestaurantList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  overflow: auto;
  height: 70vh;
`;

const FoodImageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-top: 24px;
  gap: 7px;
  border-top: 1px solid ${({ theme }) => theme.colors.line_01};
  overflow: auto;
  padding-bottom: 80px;
`;

const NonSelectedButton = styled(Button)`
  position: relative;
`;

const FoodItem = styled.div`
  position: relative;
`;

const ColorBox = styled.div<{ theme: DefaultTheme; selectedImage: boolean }>`
  ${({ theme, selectedImage }) =>
    css`
      border-radius: 4px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      ${selectedImage &&
      css`
        border: 2px solid ${theme.colors.main_01};
        background: rgba(255, 74, 22, 0.7);
        animation: ${transitions.blink} 0.7s ease-in-out;
      `}
    `}
`;

const CompleteButton = styled(Button)`
  ${({ theme }) =>
    css`
      ${theme.typography.body01}

      position: absolute;
      bottom: 54px;
    `}
`;

export default SearchRestaurantModal;
