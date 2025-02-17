import { create } from 'zustand';

type SearchStore = {
  dates: Date[];
  setDates: (dates: Date[]) => void;
  guestCounts: {
    Adults: number;
    Children: number;
    Rooms: number;
  };
  setGuestCounts: (name: string, value: number) => void;
};
export const useSearchStore = create<SearchStore>((set) => ({
  dates: [new Date(), new Date()],
  setDates: (newDates) => set({ dates: newDates }),
  guestCounts: {
    Adults: 2,
    Children: 1,
    Rooms: 1,
  },
  setGuestCounts: (name, value) =>
    set((state) => ({
      guestCounts: {
        ...state.guestCounts,
        [name]: value,
      },
    })),
}));
