import { ImageProps } from 'next/image';
import { DrinkImage } from 'public/images';

import FallbackImage from './FallbackImage';

interface Props extends Omit<ImageProps, 'alt'> {}

function DrinkImageWrapper({ ...rest }: Props) {
  return <FallbackImage alt="전통주" fallbackSrc={DrinkImage} {...rest} />;
}

export default DrinkImageWrapper;
