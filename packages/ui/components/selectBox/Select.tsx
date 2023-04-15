import { useOutsideClick } from "@chooz/hooks";
import { Option, OptionList, SelectButton } from "@chooz/ui";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  onChangeSelectedOption: (value: string) => void;
  options: Option[];
  isOpen: boolean;
  onToggleOpen: () => void;
  children?: React.ReactNode;
}

function Select({
  defaultValue,
  onChangeSelectedOption,
  options,
  isOpen,
  onToggleOpen,
  children,
}: SelectProps) {
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
