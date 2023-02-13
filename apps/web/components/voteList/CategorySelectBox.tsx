import { Option, OptionList, SelectButton, useSelect } from "@chooz/ui";
import useOutSideClick from "hooks/useOutsideClick";
import { CATEGORY_LIST } from "lib/constants";
import styled from "styled-components";

// @todo 추후 context api로 변경
// @todo 재사용 가능한 컴포넌트로 만들기
function CategorySelectBox() {
  const { isOpen, onChangeOpen, option, onChangeOption } = useSelect("전체");
  const { targetEl } = useOutSideClick<HTMLDivElement>(isOpen, onChangeOpen);
  return (
    <SelectBox ref={targetEl}>
      <SelectButton onChangeOpen={onChangeOpen}>
        <>
          {option}
          <span>▴</span>
        </>
      </SelectButton>
      {isOpen ? (
        <OptionList>
          {CATEGORY_LIST.map(
            ({ name }) =>
              option !== name && (
                <Option key={`option_list_${name}`} name={name} onChangeOption={onChangeOption} />
              ),
          )}
        </OptionList>
      ) : null}
    </SelectBox>
  );
}

const SelectBox = styled.div``;

export default CategorySelectBox;
