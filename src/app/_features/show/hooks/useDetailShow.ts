'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ShowDetailApiType, ShowDetailType } from '@/types/showDetailType';
import { API_URL, axiosInstance } from '@/lib/api';

const endpoint = API_URL.shows;

async function getShowDetail(id: number): Promise<ShowDetailType> {
  try {
    const response = await axiosInstance.get<ShowDetailApiType>(`/${endpoint}/${id}`);

    const data: ShowDetailType = response.data.data;
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
export function useShowDetail(id: number) {
  return useSuspenseQuery({
    queryKey: ['showDetail', id],
    queryFn: () => getShowDetail(id),
  });
}
