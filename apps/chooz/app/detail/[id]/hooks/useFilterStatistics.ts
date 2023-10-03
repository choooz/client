import React, { useState } from "react";
import useFilteredStatisticsService from "services/useFilteredStatisticsService";
import { Filter } from "types/vote";

const useFilterStatistics = (postId: number) => {
  const [filter, setFilter] = useState<Filter>({
    age: "",
    mbti: "",
    gender: "",
  });

  const { voteStatisticsQuery } = useFilteredStatisticsService(
    postId,
    filter.gender,
    filter.mbti,
    filter.age,
  );

  const onChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onDeleteFilter = (name: string) => {
    setFilter((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return { filter, onChangeFilter, onDeleteFilter, voteStatisticsQuery };
};

export default useFilterStatistics;
