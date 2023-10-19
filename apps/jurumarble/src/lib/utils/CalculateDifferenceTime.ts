// @note 현재 시간과 이전 시간의 차이를 계산하여 단위별로 출력
export function CalculateDifferenceTime(previous: string) {
  const currentDate = new Date();
  const modifiedDate = new Date(previous);

  const diffMSec = currentDate.getTime() - modifiedDate.getTime();
  // 1시간 이내 분 단위로 표시
  if (diffMSec < 60 * 60 * 1000) {
    const diffMin = diffMSec / (60 * 1000);
    return `${Math.round(diffMin)}m`;
  }
  // 24시간 이내 시간 단위로 표시
  else if (diffMSec < 24 * 60 * 60 * 1000) {
    const diffHour = diffMSec / (60 * 60 * 1000);
    return `${Math.round(diffHour)}h`;
  }
  // 24시간 이상 일로 표시
  return modifiedDate.toLocaleDateString();
}
