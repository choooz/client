/**
 * @description 클라이언트, 서버에서 동일한 시간을 반환해주는 함수
 */
export const getIsomorphicDate = (timeZone = 'Asia/Seoul') => {
  const time = new Date().toLocaleString('en-US', { timeZone });
  return new Date(time);
};
