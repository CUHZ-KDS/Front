'use client';
import { ShowApiType } from '@/types/showType';
import { useSuspenseQuery } from '@tanstack/react-query';
import { dummyData } from '../dummy';
import { API_URL } from '@/lib/api';

const base_url = API_URL.base;
const endpoint = API_URL.shows;

async function getShowList(): Promise<ShowApiType> {
  try {
    const response = await fetch(`${base_url}/${endpoint}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(errorText);
      throw new Error('');
    }
    const data: ShowApiType = await response.json();
    return data;
  } catch (e) {
    // 상세한 에러 핸들링 필요
    throw e;
  }
}

/**
 * 더미 데이터
 * 추후 삭제 예정
 */
async function getDummyShowList(): Promise<ShowApiType> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyData);
    }, 2000);
  });
}

/**
 *
 * @param isMock
 * @returns 전체 공연 리스트를 반환합니다.
 */
export function useShowList(isMock: boolean = true) {
  return useSuspenseQuery({
    queryKey: ['showList'],
    queryFn: isMock ? getDummyShowList : getShowList,
  });
}
