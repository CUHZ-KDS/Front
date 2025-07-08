import { useMutation } from '@tanstack/react-query';
import { ReservationsApiType, ReservationType } from '../types';
import { API_URL, axiosInstance } from '@/lib/api';
import { axiosErrorResponse } from '@/lib/axiosErrorResponse';

const endpoint = API_URL.book;

const bookAPI = async (seatIds: string[]): Promise<ReservationType> => {
  try {
    const response = await axiosInstance.post<ReservationsApiType>(`${endpoint}`, {
      showSeatMappingIds: seatIds,
    });

    const data: ReservationType = response.data.data;
    return data;
  } catch (error) {
    throw axiosErrorResponse(error);
  }
};

export const useBookMutation = (scheduleId: string) => {
  return useMutation({
    mutationKey: ['book', scheduleId],
    mutationFn: (seatIds: string[]) => bookAPI(seatIds),
  });
};
