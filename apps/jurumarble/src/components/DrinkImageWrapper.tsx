import { ImageProps } from 'next/image';
import { DrinkImage } from 'public/images';

import FallbackImage from './FallbackImage';

function DrinkImageWrapper({ ...rest }: ImageProps) {
  return <FallbackImage fallbackSrc={DrinkImage} {...rest} />;
}

export default DrinkImageWrapper;
