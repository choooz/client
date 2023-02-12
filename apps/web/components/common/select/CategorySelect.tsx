import useOutSideClick from "hooks/useOutsideClick";
import { PropsWithChildren } from "react";
import Option from "./Option";
import { OptionList } from "./OptionList";
import SelectButton from "./SelectButton";
import useSelect from "hooks/useSelect";
import { CATEGORY_LIST } from "lib/constants";
import styled from "styled-components";

// @todo 추후 context api로 변경
// @todo 재사용 가능한 컴포넌트로 만들기
function CategorySelect({ children }: PropsWithChildren) {
  const { isOpen, onChangeOpen, option, onChangeOption } = useSelect("전체");
  const { targetEl } = useOutSideClick(isOpen, onChangeOpen);
  return (
    <SelectBox ref={targetEl}>
      <SelectButton onChangeOpen={onChangeOpen}>{option}</SelectButton>
      {isOpen ? (
        <OptionList>
          {CATEGORY_LIST.map(
            ({ name }) => option !== name && <Option name={name} onChangeOption={onChangeOption} />,
          )}
        </OptionList>
      ) : null}
    </SelectBox>
  );
}

const SelectBox = styled.div``;

export default CategorySelect;
