import { axiosInstance } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CancelApiType } from '../types';
import { axiosErrorResponse } from '@/lib/axiosErrorResponse';

// 결제 취소에 관한 데이터 필요
const postShowCancel = async (id: string): Promise<{ data: null }> => {
  try {
    const response = await axiosInstance.post<CancelApiType>(`/api/v1/orders/${id}/cancel`);

    const data: { data: null } = response.data;
    return data;
  } catch (error) {
    throw axiosErrorResponse(error);
  }
};

export const useShowCancel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['cancle'],
    mutationFn: (id: string) => postShowCancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myShowList'] });
    },
  });
};
