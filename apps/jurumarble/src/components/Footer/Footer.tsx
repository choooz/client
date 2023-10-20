import { getClassNames } from 'lib/styles/getClassNames';
import Link from 'next/link';
import { SvgLogo } from 'src/assets/icons/components';

import styles from './styles.module.css';

const cx = getClassNames(styles);

const LINK_LIST = [
  {
    label: '주루마블 소개',
    href: '/about',
  },
  {
    label: '이용약관',
    href: '/agreement',
  },
  {
    label: '개인정보처리방침',
    href: '/',
  },
  {
    label: '신고가이드',
    href: '/how-to-report',
  },
];

function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('link-list')}>
        {LINK_LIST.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={cx('caption_chip', 'black-03')}
          >
            {label}
          </Link>
        ))}
      </div>
      <SvgLogo width={76} height={14} className={cx('mt-16')} />
      <span className={cx('mt-24', 'caption_chip', 'black-04')}>
        @ 2023 주루마블. All rights reserved.
      </span>
    </footer>
  );
}

export default Footer;
