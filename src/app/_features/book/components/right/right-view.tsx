import PaymentPreview from './payment-preview';
import SelectSeat from './select-seat';

export default function RightView() {
  return (
    <>
      <div className="flex-1 overflow-y-auto py-4">
        <h3 className="py-4 text-xl">선택 좌석</h3>
        <SelectSeat />
      </div>

      <div className="border-b-2 border-white py-4" />
      <div className="mt-10 flex h-full max-h-40 flex-col">
        <h3 className="pb-4 text-xl">결제 예정 금액</h3>
        <PaymentPreview />
      </div>
    </>
  );
}
