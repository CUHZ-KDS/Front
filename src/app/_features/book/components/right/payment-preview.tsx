import { Button } from '@/components/ui/button';

export default function PaymentPreview() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center text-xl">99,000원</div>
      <Button
        className="ml-auto h-[49px] w-[162px] cursor-pointer text-xl font-semibold"
        variant="ff"
      >
        결제하기
      </Button>
    </div>
  );
}
