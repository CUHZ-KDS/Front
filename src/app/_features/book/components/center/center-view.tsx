import { CountdownTimer } from '@/components/countdownTimer';
import SelectZone from './selectZone';

export default function Centerview() {
  const onComplte = () => {
    // 카운트가 다 됐을때 밖으로
  };
  return (
    <>
      <CountdownTimer initialSeconds={10} onComplete={onComplte} />
      <SelectZone />
    </>
  );
}
