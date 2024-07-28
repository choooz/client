export const TAB_LIST = [
  { id: 'created-vote', name: '작성한 투표' },
  { id: 'participated-vote', name: '참여한 투표' },
  { id: 'bookmarked-vote', name: '북마크 투표' },
] as const;

export type TabList = (typeof TAB_LIST)[number]['id'];
