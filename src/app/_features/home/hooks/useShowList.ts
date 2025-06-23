'use client';
import { ShowApiType } from '@/types/showType';
import { useSuspenseQuery } from '@tanstack/react-query';
import { API_URL, axiosInstance } from '@/lib/api';

const endpoint = API_URL.shows;

async function getShowList(): Promise<ShowApiType> {
  try {
    const response = await axiosInstance.get<ShowApiType>(`/${endpoint}`);

    const data: ShowApiType = response.data;
    return data;
  } catch (e) {
    // 상세한 에러 핸들링 필요
    throw e;
  }
}

/**
 * @returns 전체 공연 리스트를 반환합니다.
 */
export function useShowList() {
  return useSuspenseQuery({
    queryKey: ['showList'],
    queryFn: getShowList,
  });
}
