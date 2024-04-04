export const TAB_LIST = [
  { id: 'total', name: '통합' },
  { id: 'drinkInfo', name: '우리술 정보' },
  { id: 'drinkVote', name: '우리술 투표' },
] as const;

export type TabList = (typeof TAB_LIST)[number]['id'];
