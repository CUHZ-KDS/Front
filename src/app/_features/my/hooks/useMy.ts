'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { MyShowApiType, MyShowType } from '@/types/myShowType';
import { API_URL, axiosInstance } from '@/lib/api';
import { axiosErrorResponse } from '@/lib/axiosErrorResponse';

const endpoint = API_URL.my_reservations;

async function getMyShowList(): Promise<MyShowType> {
  if (typeof window === 'undefined') {
    return { reservations: {} } as MyShowType;
  }

  try {
    const response = await axiosInstance.get<MyShowApiType>(`/${endpoint}`);

    const data: MyShowType = response.data.data;
    return data;
  } catch (error) {
    throw axiosErrorResponse(error);
  }
}

/**
 * @returns 나의 예매 목록을 반환합니다.
 */
export function useMyShowList() {
  return useSuspenseQuery({
    queryKey: ['myShowList'],
    queryFn: getMyShowList,
  });
}
