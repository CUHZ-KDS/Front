'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ShowDetailAndSchedulesApiType,
  ShowDetailApiType,
  ShowSchedulesApiType,
} from '@/types/showDetailType';
import { API_URL, axiosInstance } from '@/lib/api';

const endpoint = API_URL.shows;

async function getShowDetail(showId: number): Promise<ShowDetailAndSchedulesApiType> {
  try {
    const showDetailRequest = axiosInstance.get<ShowDetailApiType>(`/${endpoint}/${showId}`);
    const showSchedulesRequest = axiosInstance.get<ShowSchedulesApiType>(
      `/api/v1/shows/${showId}/schedules`
    );

    const [showDetail, showSchedules] = await Promise.all([
      showDetailRequest,
      showSchedulesRequest,
    ]);

    const data: ShowDetailAndSchedulesApiType = {
      detail: showDetail.data,
      schedules: showSchedules.data,
    };
    return data;
  } catch (e) {
    // 상세한 에러 핸들링 필요
    throw e;
  }
}

/**
 *
 * @param id 공연의 아이디 값
 * @returns 공연의 상세 정보를 반환합니다.
 */
export function useShowDetail(showId: number) {
  return useSuspenseQuery({
    queryKey: ['showDetail', showId],
    queryFn: () => getShowDetail(showId),
    select: data => {
      // Detail정보와 스케쥴 정보를 합쳐서 리턴
      return {
        ...data.detail.data,
        schedules: data.schedules.data.schedules,
      };
    },
  });
}
