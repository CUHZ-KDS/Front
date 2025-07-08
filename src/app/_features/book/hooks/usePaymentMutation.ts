import { useMutation } from '@tanstack/react-query';
import { PaymentResponseData } from '../types';
import { ApproveApiType, ApproveDataType } from '../../my/types';
import { API_URL, axiosInstance } from '@/lib/api';
import { axiosErrorResponse } from '@/lib/axiosErrorResponse';

const handlePayment = async (paymentData: PaymentResponseData): Promise<ApproveDataType> => {
  const { orderId: orderToken, amount } = paymentData;
  try {
    const response = await axiosInstance.post<ApproveApiType>(`/${API_URL.approve}`, {
      orderToken,
      amount,
    });

    const data: ApproveDataType = response.data.data;
    return data;
  } catch (error) {
    throw axiosErrorResponse(error);
  }
};

export const usePaymentMutation = (orderToken: string) => {
  return useMutation({
    mutationKey: ['payment', orderToken],
    mutationFn: handlePayment,
  });
};
