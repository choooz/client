import SvgIcCamera from 'src/assets/icons/components/IcCamera';
import styled, { css, useTheme } from 'styled-components';

interface Props {
  width: `${number}px` | `${number}%` | 'auto';
  height: `${number}px` | `${number}%` | 'auto';
}

function ImageUploadButton({ width, height }: Props) {
  const theme = useTheme();
  return (
    <ImageWrapper width={width} height={height}>
      <SvgIcCamera width={24} height={24} fill={theme.colors.black_01} />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div<Props>`
  ${({ theme, width, height }) => css`
    width: ${width};
    height: ${height};
    background: ${theme.colors.bg_02};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

export default ImageUploadButton;
