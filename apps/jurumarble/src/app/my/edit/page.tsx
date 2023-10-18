'use client';

import VoteHeader from 'components/VoteHeader';
import { Button } from 'components/button';
import { useRouter } from 'next/navigation';
import { SvgIcPrevious } from 'src/assets/icons/components';
import styled, { css } from 'styled-components';

import UserInfoEditContainer from './components/UserInfoEditContainer';

function ProfileEditPage() {
  const router = useRouter();
  /**
   * @TODO 헤더 픽스드인지 확인
   */
  return (
    <Container>
      <VoteHeader
        leftButton={
          <PreviousButton onClick={() => router.back()}>
            <SvgIcPrevious width={24} height={24} />
          </PreviousButton>
        }
      >
        프로필 수정
      </VoteHeader>
      <UserInfoEditContainer />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;

const PreviousButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`;

export default ProfileEditPage;
