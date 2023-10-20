import { ReactNode } from 'react';

import { getClassNames } from 'lib/styles/getClassNames';

interface Props {
  leftButton?: ReactNode;
  children?: ReactNode;
  rightButton?: ReactNode;
}
import styles from './styles.module.css';

const cx = getClassNames(styles);

function SideButtonHeader({ leftButton, children, rightButton }: Props) {
  return (
    <header className={cx('header', 'headline03')}>
      {leftButton ? leftButton : <div className={cx('empty-space')} />}
      {children}
      {rightButton ? rightButton : <div className={cx('empty-space')} />}
    </header>
  );
}

export default SideButtonHeader;
