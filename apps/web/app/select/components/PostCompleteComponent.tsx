import { FloatComponentTemplate } from "@chooz/ui";
import Path from "lib/Path";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Success } from "public/images";
import styled from "styled-components";

function PostCompleteComponent() {
  const router = useRouter();

  return (
    <FloatComponentTemplate
      onToggleModal={() => {
        router.push(`${Path.MAIN_PAGE}?isSuccess=`);
      }}
    >
      <Image alt="체크" src={Success} width={56} height={56} />
      <GuideText>선택결정이 등록되었어요.</GuideText>
    </FloatComponentTemplate>
  );
}

const GuideText = styled.div`
  color: ${({ theme }) => theme.palette.background.white};
  ${({ theme }) => theme.textStyle.Title_Large}
  font-weight: 700;
`;

export default PostCompleteComponent;
