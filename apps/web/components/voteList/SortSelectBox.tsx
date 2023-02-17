import { Option, OptionList, SelectButton, useSelect } from "@chooz/ui";
import useOutSideClick from "hooks/useOutsideClick";
import { SORT_LIST } from "lib/constants";
import { SelectDropdownIndicator } from "public/icons";
import styled from "styled-components";

function SortSelectBox() {
  const [isOpen, onChangeOpen, option, onChangeOption] = useSelect("ByTime");
  const { targetEl } = useOutSideClick<HTMLDivElement>(isOpen, onChangeOpen);
  return (
    <SelectBox ref={targetEl}>
      <SelectButton onChangeOpen={onChangeOpen}>
        <>
          {SORT_LIST.find(({ id }) => id === option)?.name}
          <SelectDropdownIndicator />
        </>
      </SelectButton>
      {isOpen ? (
        <OptionList>
          {SORT_LIST.map(({ id, name }) => (
            <Option key={`sort_list_${id}`} id={id} name={name} onChangeOption={onChangeOption} />
          ))}
        </OptionList>
      ) : null}
    </SelectBox>
  );
}

const SelectBox = styled.div`
  border: solid 1px ${({ theme }) => theme.palette.border.base}; ;
`;

export default SortSelectBox;
