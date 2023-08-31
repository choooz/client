import { useState } from "react";

export interface CommentFilter {
  age: number | null;
  mbti: string | null;
  gender: string | null;
  sortBy: string | null;
}

export default function useCommentFilter() {
  const [commentFilter, setCommentFilter] = useState<CommentFilter>({
    age: null,
    mbti: null,
    gender: null,
    sortBy: "ByTime",
  });

  const onChangeCommentFilter = (sort: string) => {
    setCommentFilter((prev) => ({
      ...prev,
      sortBy: sort,
    }));
  };

  return { commentFilter, onChangeCommentFilter };
}
