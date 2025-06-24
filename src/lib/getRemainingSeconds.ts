import moment from 'moment';

/**
 * 특정 날짜/시간 문자열을 기준으로 현재 시간까지 남은 초를 계산합니다.
 *
 * @param targetDateTimeString 예: "2025-06-24T14:00:00" (ISO 8601 형식)
 * @param serverCurrentTimeString 예: "2025-06-24T14:00:00" (ISO 8601 형식)
 * @returns 남은 시간(초). 이미 지난 시간이라면 0 또는 음수.
 */
export function getRemainingSeconds(
  targetDateTimeString: string,
  serverCurrentTimeString?: string
): number {
  const targetMoment = moment(targetDateTimeString);

  const nowMoment = serverCurrentTimeString ? moment(serverCurrentTimeString) : moment();

  const diffSeconds = targetMoment.diff(nowMoment, 'seconds');

  return diffSeconds;
}
