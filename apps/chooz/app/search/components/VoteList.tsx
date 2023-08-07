import { Vote } from "types/vote";
import VoteItem from "./VoteItem";

interface Props {
  voteList: Vote[];
}

function VoteList({ voteList }: Props) {
  if (!voteList) return null;

  return (
    <>
      {voteList.map((vote: Vote, index: number) => (
        <VoteItem key={`voteList_${index}`} vote={vote} />
      ))}
    </>
  );
}

export default VoteList;
