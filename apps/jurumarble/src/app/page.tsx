import BottomBar from 'components/BottomBar';
import Header from 'components/Header';
import { getClassNames } from 'lib/styles/getClassNames';
import dynamic from 'next/dynamic';

import { HydratedDrinkVoteContainer } from './main/containers/HydratedDrinkVoteContainer';
import { HydratedHotDrinkContainer } from './main/containers/HydratedHotDrinkContainer';
import styles from './page.module.css';

const DynamicTodayDrinkRecommendation = dynamic(
  () => import('./main/components/TodayDrinkRecommendation'),
);

const DynamicSearchInputWrapper = dynamic(
  () => import('./main/components/SearchInputWrapper'),
);

const DynamicBanner = dynamic(() => import('./main/components/Banner'));
const DynamicFooter = dynamic(() => import('components/Footer/Footer'));

const cx = getClassNames(styles);

function MainPage() {
  return (
    <>
      <Header />
      <DynamicTodayDrinkRecommendation />
      <section className={cx('main-top-section')}>
        <DynamicBanner />
        <DynamicSearchInputWrapper />
        {/* @ts-expect-error Server Component */}
        <HydratedHotDrinkContainer />
      </section>
      <div className={cx('main-divide-line')} />
      <section className={cx('main-bottom-section')}>
        {/* @ts-expect-error Server Component */}
        <HydratedDrinkVoteContainer />
      </section>
      <DynamicFooter />
      <BottomBar />
    </>
  );
}

export default MainPage;
