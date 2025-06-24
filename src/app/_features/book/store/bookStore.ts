import { create } from 'zustand';
import { GroupSortType, SeatsType } from '../types';

const SELECTE_SEATS_MAX_LENGTH = 2;

type State = {
  availableSeats: number;
  selectZone: GroupSortType | null;
  selectSeats: { zoneName: string; seat: SeatsType }[];
};

type Actions = {
  setSelectZone: (zone: GroupSortType) => void;
  setSelectSeats: (seat: { zoneName: string; seat: SeatsType }) => void;
  reset: () => void;
};

export const useBookStore = create<State & Actions>(set => ({
  availableSeats: 2,
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
        return {
          selectSeats: updatedSeats,
          availableSeats: SELECTE_SEATS_MAX_LENGTH - updatedSeats.length,
        };
      }

      if (currentSeats.length >= SELECTE_SEATS_MAX_LENGTH) {
        return { ...state };
      }

      const updatedSeats = [...currentSeats, seat];

      return {
        selectSeats: updatedSeats,
        availableSeats: SELECTE_SEATS_MAX_LENGTH - updatedSeats.length,
      };
    });
  },
  reset: () => {
    set(() => {
      return { selectZone: null, selectSeats: [] };
    });
  },
}));
