interface Props {
  label: string;
  onChangeSelectedOption: () => void;
}

function Option({ label, onChangeSelectedOption }: Props) {
  return (
    <li role="option" onClick={onChangeSelectedOption}>
      {label}
    </li>
  );
}

export default Option;
