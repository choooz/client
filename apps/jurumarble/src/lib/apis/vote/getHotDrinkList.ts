import { SERVER_URL } from "lib/env";

export interface GetHotDrinkResponse {
  drinkId: number;
  name: string;
  manufactureAddress: string;
  image: string;
}
export const getHotDrinkList = async () => {
  const res = await fetch(`${SERVER_URL}api/drinks/hot`);
  const data = await res.json();
  return data as GetHotDrinkResponse[];
};
