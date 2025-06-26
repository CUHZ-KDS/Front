import { useMutation } from '@tanstack/react-query';
import { ReservationsApiType, ReservationType } from '../types';
import { API_URL, axiosInstance } from '@/lib/api';

const endpoint = API_URL.book;
// const endpoint = API_URL.shows;

const bookAPI = async (seatIds: string[]): Promise<ReservationType> => {
  const response = await axiosInstance.post<ReservationsApiType>(`${endpoint}`, {
    showSeatMappingIds: seatIds,
  });

  const data: ReservationType = response.data.data;
  return data;
};

export const useBookMutation = (scheduleId: string, handleOnSuccess: () => void) => {
  return useMutation({
    mutationKey: ['book', scheduleId],
    mutationFn: (seatIds: string[]) => bookAPI(seatIds),
    onSuccess: () => {
      handleOnSuccess();
      // 성공시 결제 페이지가 떠야함 dialog로
    },
  });
};
