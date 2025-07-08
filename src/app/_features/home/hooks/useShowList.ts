'use client';
import { ShowApiType, ShowType } from '@/types/showType';
import { useSuspenseQuery } from '@tanstack/react-query';
import { API_URL, axiosInstance } from '@/lib/api';
import { axiosErrorResponse } from '@/lib/axiosErrorResponse';

const endpoint = API_URL.shows;

async function getShowList(): Promise<ShowType[]> {
  try {
    const response = await axiosInstance.get<ShowApiType>(`/${endpoint}`);

    const data: ShowType[] = response.data.data.shows;

    return data;
  } catch (error) {
    throw axiosErrorResponse(error);
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
