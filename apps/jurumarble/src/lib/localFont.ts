import { NextFont } from 'next/dist/compiled/@next/font';
import localFont from 'next/font/local';

export const pretandard: NextFont = localFont({
  src: [
    {
      path: '../../public/font/Pretendard-Black.subset.woff',
      style: 'normal',
      weight: '900',
    },
    {
      path: '../../public/font/Pretendard-ExtraBold.subset.woff',
      style: 'normal',
      weight: '800',
    },
    {
      path: '../../public/font/Pretendard-Bold.subset.woff',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../../public/font/Pretendard-SemiBold.subset.woff',
      style: 'normal',
      weight: '600',
    },
    {
      path: '../../public/font/Pretendard-Medium.subset.woff',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../../public/font/Pretendard-Regular.subset.woff',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../public/font/Pretendard-Light.subset.woff',
      style: 'normal',
      weight: '300',
    },
    {
      path: '../../public/font/Pretendard-ExtraLight.subset.woff',
      style: 'normal',
      weight: '200',
    },
    {
      path: '../../public/font/Pretendard-Thin.subset.woff',
      style: 'normal',
      weight: '100',
    },
  ],
});
