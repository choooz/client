import { useState } from 'react';

import Image, { ImageProps, StaticImageData } from 'next/image';

interface Props extends ImageProps {
  fallbackSrc: string | StaticImageData;
}

function FallbackImage({ alt, src, fallbackSrc, ...rest }: Props) {
  const [error, setError] = useState(false);
  return (
    <Image
      alt={alt}
      src={error === true ? fallbackSrc : src}
      onError={() => setError(true)}
      {...rest}
    />
  );
}

export default FallbackImage;
