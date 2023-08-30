import { useState } from "react";

export default function useUpdateSelectedDrinkList() {
  const [selectedDrinkList, setDrinkList] = useState([] as string[]);

  const onClickAddDrink = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    selectedDrinkList.includes(name)
      ? setDrinkList((prev) => prev.filter((item) => item !== name))
      : selectedDrinkList.length < 2 && setDrinkList((prev) => [...prev.concat(name)]);
  };

  const onClickDeleteItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;

    setDrinkList((prev) => prev.filter((item) => item !== name));
  };

  return { selectedDrinkList, onClickAddDrink, onClickDeleteItem };
}
