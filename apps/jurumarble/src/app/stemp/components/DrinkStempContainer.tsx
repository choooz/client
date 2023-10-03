import MyEnjoiedDrinkInfoSection from "./MyEnjoiedDrinkInfoSection";
import StempedDrinkList from "./StempedDrinkList";
import { useState } from "react";
import useDrinkStempService from "../service/useDrinkStempListService";

function DrinkStempContainer() {
  const [regionOption, setRegionOption] = useState("");
  const onChangeRegionOption = (value: string) => {
    setRegionOption(value);
  };

  const { drinkList, subscribe, numberOfStempedDrinks } = useDrinkStempService({
    page: 0,
    size: 10,
    region: regionOption,
  });

  return (
    <>
      <MyEnjoiedDrinkInfoSection numberOfStempedDrinks={numberOfStempedDrinks} />
      <StempedDrinkList
        regionOption={regionOption}
        onChangeRegionOption={onChangeRegionOption}
        drinkList={drinkList}
      />
      <div ref={subscribe}></div>
    </>
  );
}

export default DrinkStempContainer;
