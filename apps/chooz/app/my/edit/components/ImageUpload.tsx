import styled from "styled-components";
import ImageUploadButton from "components/common/ImageUploadButton";
import Image from "next/image";

interface Props {
  imageUrl: string;
  onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImageUpload({ imageUrl, onUploadImage }: Props) {
  return (
    <Label htmlFor="file">
      {imageUrl ? (
        <Image alt="프로필 사진" src={imageUrl} width={107} height={107} />
      ) : (
        <ImageUploadButton width="107px" height="107px" />
      )}
      <ImageUploadInput multiple type="file" id="file" onChange={onUploadImage} />
    </Label>
  );
}

const Label = styled.label`
  cursor: pointer;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

export default ImageUpload;
