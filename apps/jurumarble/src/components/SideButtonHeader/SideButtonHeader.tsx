import { ReactNode } from 'react';

import { getClassNames } from 'lib/styles/getClassNames';

import styles from './styles.module.css';

interface Props {
  leftButton?: ReactNode;
  children?: ReactNode;
  rightButton?: ReactNode;
}

const cx = getClassNames(styles);

function SideButtonHeader({ leftButton, children, rightButton }: Props) {
  return (
    <header className={cx('header')}>
      {leftButton ? leftButton : <div className={cx('empty-space')} />}
      <span className={cx('headline03')}>{children}</span>
      {rightButton ? rightButton : <div className={cx('empty-space')} />}
    </header>
  );
}

export default SideButtonHeader;
