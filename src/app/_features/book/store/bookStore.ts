import { create } from 'zustand';
import { SeatsType, ZoneType } from '../dummy';

type State = {
  selectZone: ZoneType | null;
  selectSeats: { zoneName: string; seat: SeatsType }[];
};

type Actions = {
  setSelectZone: (zone: ZoneType) => void;
  setSelectSeats: (zone: { zoneName: string; seat: SeatsType }) => void;
};

export const useBookStore = create<State & Actions>(set => ({
  selectZone: null,
  setSelectZone: zone =>
    set(state => {
      return { ...state, selectZone: zone };
    }),

  selectSeats: [],
  setSelectSeats: seat => {
    set(state => {
      const currentSeats = [...state.selectSeats];

      const findIndex = currentSeats.findIndex(s => s.seat.id === seat.seat.id);

      if (findIndex > -1) {
        const updatedSeats = currentSeats.filter(s => s.seat.id !== seat.seat.id);
        return { selectSeats: updatedSeats };
      }

      const updatedSeats = [...currentSeats, seat];

      return { selectSeats: updatedSeats };
    });
  },
}));
