import { useState } from 'react';

import { useToggle } from '@monorepo/hooks';
import ReplaceLoginPageModal from 'components/ReplaceLoginPagemModal/ReplaceLoginPageModal';

import MyEnjoiedDrinkInfoSection from './MyEnjoiedDrinkInfoSection';
import StampedDrinkList from './StampedDrinkList';
import useDrinkStampService from '../service/useDrinkStampListService';

function DrinkStampContainer() {
  const [isReplaceLoginPageModal, onToggleReplaceLoginPageModal] = useToggle();

  const [regionOption, setRegionOption] = useState('');
  const onChangeRegionOption = (value: string) => {
    setRegionOption(value);
  };

  const { drinkList, subscribe, enjoyedDrinkCount } = useDrinkStampService({
    page: 0,
    size: 10,
    region: regionOption,
  });

  return (
    <>
      <MyEnjoiedDrinkInfoSection enjoyedDrinkCount={enjoyedDrinkCount} />
      <StampedDrinkList
        regionOption={regionOption}
        onChangeRegionOption={onChangeRegionOption}
        drinkList={drinkList}
        onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
      />
      <div ref={subscribe} />

      {isReplaceLoginPageModal && (
        /**
         * @TODO 필요 없을 것 같은데 DrinkItem에서 없으면 안되는 값이라 일단 넣음
         */
        <ReplaceLoginPageModal
          onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
        />
      )}
    </>
  );
}

export default DrinkStampContainer;
