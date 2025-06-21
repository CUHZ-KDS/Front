import { SeatsType } from '../../dummy';

export const groupAndSortSeats = (seats: SeatsType[]): SeatsType[][] => {
  if (!seats || seats.length === 0) {
    return [];
  }

  const groupedByRow = seats.reduce(
    (acc, seat) => {
      const rowKey = seat.row;

      if (!acc[rowKey]) {
        acc[rowKey] = [];
      }

      acc[rowKey].push(seat);
      return acc;
    },
    {} as Record<number, SeatsType[]>
  );

  const sortedRows = Object.values(groupedByRow).map(row =>
    row.sort((a, b) => a.column - b.column)
  );

  return sortedRows.sort((a, b) => a[0].row - b[0].row);
};
