'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/api';
import { AllSeatsApiType, AllSeatsDataType } from '../types';

// 특정 공연에 대한

async function getSeatsData(scheduleId: string): Promise<AllSeatsDataType> {
  try {
    const response = await axiosInstance.get<AllSeatsApiType>(
      `/api/v1/show-schedules/${scheduleId}/seats`
    );

    const data: AllSeatsDataType = response.data.data;
    return data;
  } catch (e) {
    // 상세한 에러 핸들링 필요
    throw e;
  }
}

/**
 * @returns 공연의 좌석 정보를 가져옵니다.
 */
export function useSeats(scheduleId: string) {
  return useSuspenseQuery({
    queryKey: ['seatsData', scheduleId],
    queryFn: () => getSeatsData(scheduleId),
  });
}
