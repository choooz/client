import { useDebounce, useToggle } from "@chooz/hooks";
import { getSearchRecommendationAPI } from "lib/apis/vote";
import { useState } from "react";
import SearchInput from "./SearchInput";
import SearchRecommendation from "./SearchRecommendation";

function SearchContainer() {
  const [isSearchRecommendation, onToggleSearchRecommendation] = useToggle();
  const [keyword, setKeyword] = useState("");
  const [recommendationKeywordList, setRecommendationKeywordList] = useState<string[]>([]);

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useDebounce({ func: () => searchRecommendation(keyword), delay: 500, deps: [keyword] });

  const searchRecommendation = async (keyword: string) => {
    const { recommendKeywords } = await getSearchRecommendationAPI({
      keyword,
      category: null,
    });
    setRecommendationKeywordList(recommendKeywords);
  };

  return (
    <>
      <SearchInput
        isSearchRecommendation={isSearchRecommendation}
        onToggleSearchRecommendation={onToggleSearchRecommendation}
        onChangeKeyword={onChangeKeyword}
        keyword={keyword}
      />
      {isSearchRecommendation && (
        <SearchRecommendation recommendationKeywordList={recommendationKeywordList} />
      )}
    </>
  );
}

export default SearchContainer;
