interface SelectProps {
  children: React.ReactNode;
  onChangeOpen: () => void;
}

function SelectButton({ children, onChangeOpen }: SelectProps) {
  return (
    <>
      <button
        type="button"
        id="select-box-1"
        aria-haspopup="true"
        aria-expanded="true"
        aria-controls="select-list"
        onClick={onChangeOpen}
      >
        <span>{children}</span>
      </button>
    </>
  );
}

export default SelectButton;
