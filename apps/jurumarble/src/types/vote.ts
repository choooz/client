import { postDrinkVoteAPI, postNormalVoteAPI } from "lib/apis/vote";
import { DrinkInfo } from "./drink";

type PostNormalVoteRequest = Exclude<Parameters<typeof postNormalVoteAPI>[0], undefined>;
type PostDrinkVoteRequest = Exclude<Parameters<typeof postDrinkVoteAPI>[0], undefined>;
export type PostVoteType = PostNormalVoteRequest & PostDrinkVoteRequest;

export type DrinkInfoType = Pick<DrinkInfo, "id" | "name" | "image">;
