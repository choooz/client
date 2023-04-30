import { useState } from "react";
import { CommentFilter } from "types/comments";

export default function useCommentFilter() {
  const [commentFilter, setCommentFilter] = useState<CommentFilter>({
    age: null,
    mbti: null,
    gender: null,
    sortBy: "ByTime",
  });

  const onChangeCommentFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCommentFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return { commentFilter, onChangeCommentFilter };
}
