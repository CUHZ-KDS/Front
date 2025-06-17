import { cn } from '@/lib/utils';

interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
  isPriceSection?: boolean;
}

export default function InfoRow({ label, value, isPriceSection = false }: InfoRowProps) {
  return (
    <div
      className={cn(
        'flex border-b border-gray-700 py-2 last:border-b-0',
        isPriceSection ? 'items-start' : 'items-center'
      )}
    >
      <div className="w-1/4 text-base font-medium text-gray-400 md:text-lg">{label}</div>
      <div className="w-3/4 text-base text-white md:text-lg">{value}</div>
    </div>
  );
}
