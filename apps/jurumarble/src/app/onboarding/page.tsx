'use client';

import { SideButtonHeader } from 'components/SideButtonHeader';
import { getClassNames } from 'lib/styles/getClassNames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Onboarding } from 'public/images';
import { SvgIcX } from 'src/assets/icons/components';

import BottomButton from './components/BottomButton';
import styles from './page.module.css';

const OnboardingPage = () => {
  const cx = getClassNames(styles);
  const router = useRouter();

  /**
   * @TODO 서버 컴포넌트에서 router 대신 사용할 수 있는 것을 찾아서 대체
   */

  return (
    <div className={cx('container')}>
      <SideButtonHeader
        rightButton={
          <button
            className={cx('close-button')}
            onClick={() => {
              router.back();
            }}
          >
            <SvgIcX width={24} height={24} />
          </button>
        }
      />
      <div className={cx('img-wrapper')}>
        <Image src={Onboarding} width={375} height={2112} alt="온보딩" />
      </div>
      <BottomButton />
    </div>
  );
};

export default OnboardingPage;
