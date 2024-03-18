/**
 * @TODO DrinkImage 의존성 제거
 */

import { DrinkImage } from 'public/images';

export function classifyImageUrl(imageUrl: string) {
  const regex =
    /elasticbeanstalk-ap-northeast-2-319210348301\.s3\.ap-northeast-2\.amazonaws\.com/;
  if (imageUrl && regex.test(imageUrl)) {
    return DrinkImage;
  }
  return imageUrl;
}
