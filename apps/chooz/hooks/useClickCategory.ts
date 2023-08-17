import { useState } from "react";
import { CategoryNameType } from "types/vote";

export default function useClickCategory() {
  const [categoryList, setCategoryList] = useState<CategoryNameType[]>([]);

  const onClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.name as CategoryNameType;
    categoryList.includes(category)
      ? setCategoryList((prev) => prev.filter((item) => item !== category))
      : setCategoryList((prev) => [...prev.concat(category)]);
  };
  return {
    categoryList,
    onClickCategory,
  };
}
