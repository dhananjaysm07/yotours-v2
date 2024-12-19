import { create } from 'zustand';

interface HeroState {
  tabs: { id: number; name: string; icon: string }[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const useHeroStore = create<HeroState>((set) => ({
  tabs: [
    { id: 1, name: 'Tour', icon: 'icon-destination' },
    { id: 2, name: 'Attraction', icon: 'icon-ski' },
  ],
  currentTab: 'Tour',
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));
