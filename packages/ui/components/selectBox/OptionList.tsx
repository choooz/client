import Option from "./Option";

interface Option {
  value: string;
  label: string;
}
interface Props {
  options: Option[];
  // @todo 수정하기
  onChangeSelectedOption: (value: any) => void;
  onToggleOpen: () => void;
}

function OptionList({ options, onChangeSelectedOption, onToggleOpen }: Props) {
  return (
    <ul aria-labelledby="select-box-1" id="select-list" role="listbox">
      {options.map(({ value, label }) => (
        <Option
          key={`select_${value}`}
          label={label}
          onChangeSelectedOption={() => {
            onChangeSelectedOption(value);
            onToggleOpen();
          }}
        />
      ))}
    </ul>
  );
}

export default OptionList;
