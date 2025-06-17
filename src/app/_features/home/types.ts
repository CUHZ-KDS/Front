import { ShowType } from '@/types/showType';

export interface ShowDetailDialogProps {
  selectedItem: ShowType | null;
  onClose: () => void;
}
