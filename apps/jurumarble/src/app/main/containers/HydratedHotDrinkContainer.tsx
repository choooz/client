import { dehydrate } from '@tanstack/query-core';
import { getHotDrinkList } from 'lib/apis/vote/getHotDrinkList';
import getQueryClient from 'src/modules/getQueryClient';
import HydrateOnClient from 'src/modules/hydrateOnClient';

import HotDrinkContainer from '../components/HotDrinkContainer';
import { hotDrinkListQueryKey } from '../services/queryKey';

export const HydratedHotDrinkContainer = async () => {
  const qc = getQueryClient();
  await qc.prefetchQuery([hotDrinkListQueryKey], getHotDrinkList);
  const dehydratedState = dehydrate(qc);
  return (
    <HydrateOnClient state={dehydratedState}>
      <HotDrinkContainer />
    </HydrateOnClient>
  );
};
