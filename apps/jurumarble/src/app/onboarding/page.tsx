import { getClassNames } from 'lib/styles/getClassNames';
import Image from 'next/image';
import { Onboarding } from 'public/images';

import BottomButton from './components/BottomButton';
import styles from './page.module.css';

const OnboardingPage = () => {
  const cx = getClassNames(styles);

  return (
    <div className={cx('container')}>
      <div className={cx('img-wrapper')}>
        <Image src={Onboarding} width={375} height={2112} alt="온보딩" />
      </div>
      <BottomButton />
    </div>
  );
};

export default OnboardingPage;
