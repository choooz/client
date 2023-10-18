import { httpFetch } from "src/modules/httpFetch";

export interface GetHotDrinkResponse {
  drinkId: number;
  name: string;
  manufactureAddress: string;
  image: string;
}
export const getHotDrinkList = async () => {
  const res = await httpFetch(`api/drinks/hot`, {
    next: {
      revalidate: 60 * 60,
    },
  });
  const data = await res.json();
  return data as GetHotDrinkResponse[];
};
