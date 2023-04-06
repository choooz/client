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
    <div ref={targetEl}>
      <SelectButton onChangeOpen={onToggleOpen}>
        <>
          {options.find(({ value }) => value === defaultValue)?.label}
          <span id="indicator">{children}</span>
        </>
      </SelectButton>
      {isOpen ? (
        <OptionList
          options={options}
          onChangeSelectedOption={onChangeSelectedOption}
          onToggleOpen={onToggleOpen}
        ></OptionList>
      ) : null}
    </div>
  );
}

export default Select;
