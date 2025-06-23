'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { MyShowApiType } from '@/types/myShowType';
import { API_URL, axiosInstance } from '@/lib/api';

const endpoint = API_URL.my_reservations;

async function getMyShowList(): Promise<MyShowApiType> {
  // 서버에서 실행돼서 임시 해결
  if (typeof window === 'undefined') {
    return { data: {} } as MyShowApiType;
  }

  try {
    const response = await axiosInstance.get<MyShowApiType>(`/${endpoint}`);

    const data = response.data;
    return data;
  } catch (e) {
    // 상세한 에러 핸들링 필요
    throw e;
  }
}

/**
 * @returns 나의 예매 목록을 반환합니다.
 */
export function useMyShowList() {
  return useSuspenseQuery({
    queryKey: ['myShowList'],
    queryFn: getMyShowList,
    // select: data => {},
  });
}
