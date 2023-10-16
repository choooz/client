import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("components/Header"));
const DynamicUserInfoContainer = dynamic(() => import("./components/UseInfoContainer"));
const DynamicVoteListContainer = dynamic(() => import("./components/VoteListContainer"));
const DynamicBottomBar = dynamic(() => import("components/BottomBar"));

function MyPage() {
  return (
    <>
      <DynamicHeader />
      <DynamicUserInfoContainer />
      <DynamicVoteListContainer />
      <DynamicBottomBar />
    </>
  );
}

export default MyPage;
