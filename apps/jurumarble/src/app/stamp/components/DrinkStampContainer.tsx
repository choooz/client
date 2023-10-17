import { useState } from "react";

import MyEnjoiedDrinkInfoSection from "./MyEnjoiedDrinkInfoSection";
import StampedDrinkList from "./StampedDrinkList";
import useDrinkStampService from "../service/useDrinkStampListService";

function DrinkStampContainer() {
  const [regionOption, setRegionOption] = useState("");
  const onChangeRegionOption = (value: string) => {
    setRegionOption(value);
  };

  const { drinkList, subscribe, numberOfStampedDrinks } = useDrinkStampService({
    page: 0,
    size: 10,
    region: regionOption,
  });

  return (
    <>
      <MyEnjoiedDrinkInfoSection numberOfStampedDrinks={numberOfStampedDrinks} />
      <StampedDrinkList
        regionOption={regionOption}
        onChangeRegionOption={onChangeRegionOption}
        drinkList={drinkList}
      />
      <div ref={subscribe} />
    </>
  );
}

export default DrinkStampContainer;
