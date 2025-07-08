'use client';

import ShowCarousel from '@/components/showCarousel';
import ShowDetailDialog from '../dialog';
import { useShowList } from '../../hooks/useShowList';
import { useShowDialog } from '../../hooks/useShowDialog';
import Poster from '@/components/poster';

export default function Show() {
  const { data: showList } = useShowList();
  const { handleDialogClose, handleItemClick, selectedItem } = useShowDialog();

  return (
    <div className="w-full">
      <ShowCarousel
        showList={showList}
        onItemClick={handleItemClick}
        renderItem={item => <Poster className="h-[400px]" image={item.showImgUrl} />}
      />
      {selectedItem && <ShowDetailDialog onClose={handleDialogClose} selectedItem={selectedItem} />}
    </div>
  );
}
