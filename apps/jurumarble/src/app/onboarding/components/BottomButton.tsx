'use client';

import { Button } from 'components/button';
import { getClassNames } from 'lib/styles/getClassNames';
import { useRouter } from 'next/navigation';

import styles from '../page.module.css';

const BottomButton = () => {
  const router = useRouter();
  const cx = getClassNames(styles);
  return (
    <div className={cx('bottom-wrapper')}>
      <Button
        width="100%"
        height="56px"
        variant="primary"
        onClick={() => router.push('/')}
      >
        시작하기
      </Button>
    </div>
  );
};

export default BottomButton;
