import { useOutsideClick, useToggle } from "@chooz/hooks";
import { Option, OptionList, SelectButton } from "@chooz/ui";
import styled from "styled-components";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  onChangeSelectedOption: (value: string) => void;
  options: Option[];
  children?: React.ReactNode;
}

function Select({ defaultValue, onChangeSelectedOption, options, children }: SelectProps) {
  const [isOpen, onToggleOpen] = useToggle();
  const { targetEl } = useOutsideClick<HTMLDivElement>(isOpen, onToggleOpen);
  return (
    <SelectContainer ref={targetEl}>
      <SelectButton onChangeOpen={onToggleOpen}>
        <>
          {options.find(({ value }) => value === defaultValue)?.label}
          <Indicator>{children}</Indicator>
        </>
      </SelectButton>
      {isOpen ? (
        <OptionList
          options={options}
          onChangeSelectedOption={onChangeSelectedOption}
          onToggleOpen={onToggleOpen}
        ></OptionList>
      ) : null}
    </SelectContainer>
  );
}

const SelectContainer = styled.div``;

const Indicator = styled.span`
  margin-left: 16px;
`;
export default Select;
