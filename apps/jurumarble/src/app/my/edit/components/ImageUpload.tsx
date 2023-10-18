import Image from 'next/image';
import { SvgIcCamera } from 'src/assets/icons/components';
import styled, { css, useTheme } from 'styled-components';

interface Props {
  imageUrl: string;
  onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImageUpload({ imageUrl, onUploadImage }: Props) {
  const theme = useTheme();

  return (
    <Label htmlFor="file">
      {imageUrl ? (
        <Image
          alt="프로필 사진"
          src={imageUrl}
          width={88}
          height={88}
          style={{ borderRadius: '8px' }}
        />
      ) : (
        <CaremaBox>
          <StyledCicle>
            <SvgIcCamera width={20} height={20} fill={theme.colors.black_03} />
          </StyledCicle>
        </CaremaBox>
      )}
      <ImageUploadInput
        multiple
        type="file"
        id="file"
        onChange={onUploadImage}
      />
    </Label>
  );
}

const Label = styled.label`
  cursor: pointer;
`;

const CaremaBox = styled.div`
  ${({ theme }) => css`
    width: 88px;
    height: 88px;
    border-radius: 8px;
    border: solid 1px ${theme.colors.line_01};
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const StyledCicle = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${theme.colors.bg_02};
    border-radius: 100px;
    width: 40px;
    height: 40px;
  `}
`;

const ImageUploadInput = styled.input`
  display: none;
`;

export default ImageUpload;
