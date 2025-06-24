import CountdownTimer from '@/components/countdownTimer';

interface TimerSectionProps {
  time: number;
  onComplete: () => void;
}

export default function TimerSection({ onComplete, time }: TimerSectionProps) {
  return (
    <div className="flex h-full flex-col items-center">
      <h3 className="text-cetner text-2xl font-bold">티켓팅 까지</h3>
      <div className="flex flex-1 items-center justify-center">
        <CountdownTimer initialSeconds={time} onComplete={onComplete} />
      </div>
    </div>
  );
}
