interface CarouselPaginationProps {
  totalSlides: number;
  selectedIndex: number;
  setIndex: (index: number) => void;
}
export default function CarouselPagination({
  selectedIndex,
  setIndex,
  totalSlides,
}: CarouselPaginationProps) {
  return (
    <div className="py-2">
      <div className="flex justify-end gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            onClick={() => setIndex(index)}
            key={index}
            className={`h-2 w-6 cursor-pointer rounded-md ${index === selectedIndex ? 'bg-primary' : 'bg-muted'}`}
          >
            <span className="sr-only">{`슬라이드 ${index + 1}`}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
