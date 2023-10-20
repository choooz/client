import Path from 'lib/Path';
import { getClassNames } from 'lib/styles/getClassNames';
import Link from 'next/link';
import { SvgLogo } from 'src/assets/icons/components';

import styles from './styles.module.css';

const cx = getClassNames(styles);

const LINK_LIST = [
  {
    label: '주루마블 소개',
    href: Path.ONBOARDING_PAGE,
  },
  {
    label: '이용약관',
    href: Path.AGREEMENT_PAGE,
  },
  {
    label: '개인정보처리방침',
    href: '/',
  },
  {
    label: '고객센터',
    href: Path.HELP_PAGE,
  },
];

function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('link-list')}>
        {LINK_LIST.map(({ label, href }) => (
          <>
            <Link
              key={label}
              href={href}
              className={cx('caption_chip', 'black-03')}
            >
              {label}
            </Link>
            {label !== '고객센터' && <div className={cx('divider')} />}
          </>
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
