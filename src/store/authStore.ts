import { AuthType } from '@/types/auth';
import { create } from 'zustand';

type State = {
  user: AuthType | null;
};

type Actions = {
  login: (user: AuthType) => void;
  logout: () => void;
  initializeAuth: () => void;
};

export const useAuthStore = create<State & Actions>((set, get) => ({
  user: null,
  login: user =>
    set(() => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('guest-1', JSON.stringify(user));
      }
      return { user: user };
    }),
  logout: async () => {
    set({ user: null });
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('guest-1');
    }
  },

  initializeAuth: () => {
    if (get().user) return;

    if (typeof window !== 'undefined') {
      try {
        const storedGuest = sessionStorage.getItem('guest-1');
        if (storedGuest) {
          const guestData: AuthType = JSON.parse(storedGuest);
          // sessionStorage에서 유효한 데이터가 있으면 전역 user 상태에 설정
          set({ user: guestData });
        }
      } catch (e) {
        console.error('Failed to parse guest data from sessionStorage:', e);
        set({ user: null }); // 파싱 실패 시 user 상태 초기화
        sessionStorage.removeItem('guest-1'); // 잘못된 데이터 제거
      }
    }
  },
}));
