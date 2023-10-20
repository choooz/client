'use client';

import { SideButtonHeader } from 'components/SideButtonHeader';
import { getClassNames } from 'lib/styles/getClassNames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { howToReportImage } from 'public/images';
import { SvgIcX } from 'src/assets/icons/components';

import styles from './page.module.css';

function HelpPage() {
  const cx = getClassNames(styles);
  const router = useRouter();
  /**
   * @TODO 서버 컴포넌트에서 router 대신 사용할 수 있는 것을 찾아서 대체
   */

  return (
    <>
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
      >
        고객센터
      </SideButtonHeader>
      <div className={cx('container')}>
        <div className={cx('headline02')}>불쾌한 투표/댓글이 있으신가요?</div>
        <div className={cx('body_long03', 'mt-6')}>
          우측 상단에 점 세개 버튼을 눌러서 <br />
          신고 버튼을 누르면 신고할 수 있습니다.
        </div>
        <div className={cx('image-wrapper')}>
          <Image src={howToReportImage} fill alt="온보딩" />
        </div>
        <div className={cx('headline02', 'mt-40')}>
          그외 다른 도움이 필요하신가요?
        </div>
        <div className={cx('body_long03', 'mt-6')}>
          서비스 제휴와 광고 등은 아래의 이메일로 문의해주세요. <br />
          jurumarble.service@gmail.com
        </div>
      </div>
    </>
  );
}

export default HelpPage;
