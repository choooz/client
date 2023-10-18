import { http } from './http/http';

export const postReportVoteAPI = async (reportedVoteId: number) => {
  return await http.post('/api/reports/votes', { reportedVoteId });
};

export const postReportCommentAPI = async (reportedCommentId: number) => {
  return await http.post('/api/reports/comments', { reportedCommentId });
};
