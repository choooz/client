import BottomBar from "components/BottomBar";
import Header from "components/Header";
import UserInfoContainer from "./components/UseInfoContainer";
import VoteListContainer from "./components/VoteListContainer";

function MyPage() {
  return (
    <>
      <Header />
      <UserInfoContainer />
      <VoteListContainer />
      <BottomBar />
    </>
  );
}

export default MyPage;
