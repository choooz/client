import { postDrinkVoteAPI, postNormalVoteAPI } from "lib/apis/vote";
import { DrinkInfo } from "./drink";

type PostNormalVoteRequest = Exclude<Parameters<typeof postNormalVoteAPI>[0], undefined>;
type PostDrinkVoteRequest = Exclude<Parameters<typeof postDrinkVoteAPI>[0], undefined>;
export type PostVoteType = PostNormalVoteRequest & PostDrinkVoteRequest;

/**
 * @TODO 네이밍 변경 필요
 */
export type DrinkInfoType = Pick<DrinkInfo, "id" | "name" | "image">;
