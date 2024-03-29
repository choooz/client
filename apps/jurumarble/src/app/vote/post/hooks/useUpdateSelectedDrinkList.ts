import { useState } from 'react';

import { DrinkInfoType } from 'src/types/drink';

export default function useUpdateSelectedDrinkList() {
  const [selectedDrinkList, setDrinkList] = useState<DrinkInfoType[]>([]);

  const onClickAddDrink = (clickDrink: DrinkInfoType) => {
    const isInclude = (selectedDrink: DrinkInfoType) =>
      selectedDrink.id === clickDrink.id;
    selectedDrinkList.some(isInclude)
      ? setDrinkList((prev) =>
          prev.filter((selectedDrink) => selectedDrink.id !== clickDrink.id),
        )
      : selectedDrinkList.length < 2 &&
        setDrinkList((prev) => [...prev.concat(clickDrink)]);
  };

  const onClickDeleteItem = (clickDrink: DrinkInfoType) => {
    setDrinkList((prev) =>
      prev.filter((selectedDrink) => selectedDrink.id !== clickDrink.id),
    );
  };

  const deleteSelectedDrinkList = () => {
    setDrinkList([]);
  };

  return {
    selectedDrinkList,
    onClickAddDrink,
    onClickDeleteItem,
    deleteSelectedDrinkList,
  };
}
