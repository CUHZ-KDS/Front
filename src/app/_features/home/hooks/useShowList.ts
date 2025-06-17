import { ShowApiType } from '@/types/showType';
import { useSuspenseQuery } from '@tanstack/react-query';
import { dummyData } from '../dummy';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getShowList(): Promise<ShowApiType> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/shows`);

    if (!response.ok) {
      // 추후 에러핸들링 필요
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
