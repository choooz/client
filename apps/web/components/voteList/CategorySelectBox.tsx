import { Option, OptionList, SelectButton } from "@chooz/ui";
import useOutSideClick from "hooks/useOutsideClick";
import { CATEGORY_LIST } from "lib/constants";
import styled from "styled-components";

interface Props {
  isCategoryOpen: boolean;
  onChangeCategoryOpen: () => void;
  categoryOption: string;
  onChangeCategoryOption: (value: string) => void;
}

// @todo 추후 context api로 변경
// @todo 재사용 가능한 컴포넌트로 만들기
function CategorySelectBox({
  isCategoryOpen,
  onChangeCategoryOpen,
  categoryOption,
  onChangeCategoryOption,
}: Props) {
  const { targetEl } = useOutSideClick<HTMLDivElement>(isCategoryOpen, onChangeCategoryOpen);
  return (
    <SelectBox ref={targetEl}>
      <SelectButton onChangeOpen={onChangeCategoryOpen}>
        <>
          {CATEGORY_LIST.find(({ id }) => id === categoryOption)?.name}
          <span>▴</span>
        </>
      </SelectButton>
      {isCategoryOpen ? (
        <OptionList>
          {CATEGORY_LIST.map(
            ({ id, name }) =>
              categoryOption !== id && (
                <Option
                  key={`option_list_${id}`}
                  id={id}
                  name={name}
                  onChangeOption={onChangeCategoryOption}
                />
              ),
          )}
        </OptionList>
      ) : null}
    </SelectBox>
  );
}

const SelectBox = styled.div``;

export default CategorySelectBox;
