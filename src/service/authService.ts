import { API_URL } from '@/lib/api';
import { AuthApiType, AuthType } from '@/types/auth';

const base = API_URL.base;
const endPoint = API_URL.guest;

export async function loginUser(): Promise<AuthType> {
  const response = await fetch(`${base}/${endPoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(errorData.message || '로그인 실패');
    throw error;
  }

  const userData: AuthApiType = await response.json();
  return userData.data;
}
