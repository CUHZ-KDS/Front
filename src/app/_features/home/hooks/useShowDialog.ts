import { ShowType } from '@/types/showType';
import { useState } from 'react';

export function useShowDialog() {
  const [selectedItem, setSelectedItem] = useState<ShowType | null>(null);
  const handleItemClick = (item: ShowType) => {
    setSelectedItem(item);
  };

  const handleDialogClose = () => {
    setSelectedItem(null);
  };

  return { selectedItem, handleItemClick, handleDialogClose };
}
