import axios, { AxiosError } from 'axios';

interface ServerErrorResponseData {
  message?: string;
  code?: string;
}

export const axiosErrorResponse = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ServerErrorResponseData>;

    if (axiosError.response) {
      const statusCode = axiosError.response.status;
      const errorData = axiosError.response.data;

      // 서버 응답이 있다면 해당 응답 메시지를 반환
      if (errorData?.message) {
        return new Error(errorData?.message);
      }

      // 그외 에러 메시지를 반환
      switch (statusCode) {
        case 400:
          return new Error('잘못된 요청입니다.');

        case 401:
          return new Error('인증에 실패했습니다.');

        default:
          return new Error('알 수 없는 오류가 발생했습니다.');
      }
    }
  }
  return new Error('알 수 없는 오류가 발생했습니다.');
};
