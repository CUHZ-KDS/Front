'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ShowDetailApiType } from '@/types/showDetailType';
import { dummyData } from '../dummyDetail';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getShowDetail(id: number): Promise<ShowDetailApiType> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/shows/${id}`);

    if (!response.ok) {
      // 추후 에러핸들링 필요
      throw new Error('');
    }
    const data: ShowDetailApiType = await response.json();
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
async function getDummyShowDetail(): Promise<ShowDetailApiType> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyData);
    }, 2000);
  });
}

/**
 *
 * @param isMock 추후 삭제 예정
 * @param id 공연의 아이디 값
 * @returns 공연의 상세 정보를 반환합니다.
 */
export function useShowDetail(isMock: boolean = true, id: number) {
  return useSuspenseQuery({
    queryKey: ['showDetail', id],
    queryFn: isMock ? getDummyShowDetail : () => getShowDetail(id),
  });
}
