import { useSuspenseQuery } from '@tanstack/react-query';
import { dummyMyData } from '../dummy';
import { MyShowApiType } from '@/types/myShowType';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = ''; // 추후 토큰 어떻게 할지 고민.

async function getMyShowList(): Promise<MyShowApiType> {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/members/me/reservations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // 추후 에러핸들링 필요
      throw new Error('');
    }
    const data: MyShowApiType = await response.json();
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
async function getDummyMyShowList(): Promise<MyShowApiType> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dummyMyData);
    }, 2000);
  });
}

/**
 *
 * @param isMock
 * @returns 나의 예매 목록을 반환합니다.
 */
export function useMyShowList(isMock: boolean = true) {
  return useSuspenseQuery({
    queryKey: ['myShowList'],
    queryFn: isMock ? getDummyMyShowList : getMyShowList,
  });
}
