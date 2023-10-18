import { baseApi } from './http/base';

interface GetVoteStatisticsResponse {
  message: string;
  percentageA: number;
  percentageB: number;
  totalCountA: number;
  totalCountB: number;
  voteId: number;
}

export const getFilterStatisticsById = async (
  voteId: number,
  gender?: string,
  mbti?: string,
  age?: string,
  alcoholLimit?: string,
) => {
  const response = await baseApi.get<GetVoteStatisticsResponse>(
    `api/votes/${voteId}/select-statistics`,
    {
      params: {
        gender,
        mbti,
        age,
        alcoholLimit,
      },
    },
  );
  return response.data;
};
