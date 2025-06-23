import { API_URL, axiosInstance } from '@/lib/api';
import { AuthApiType, AuthType } from '@/types/auth';

const endPoint = API_URL.guest;

export async function loginUser(): Promise<AuthType> {
  const response = await axiosInstance.post<AuthApiType>(`/${endPoint}`);

  const userData = response.data;
  return userData.data;
}
