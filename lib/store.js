import { create } from 'zustand';
import { DateObject } from 'react-multi-date-picker';

export const useFilterStore = create((set) => ({
  filterOption: 'tour',
  setFilterOption: (option) =>
    set((state) => ({ ...state, filterOption: option })),
  currencyFilter: 'USD',
  setCurrencyFilter: (currency) => set({ currencyFilter: currency }),
  filterOptionEurope: 'tour',
  setFilterOptionEurope: (option) =>
    set((state) => ({ ...state, filterOptionEurope: option })),
  filterOptionAsia: 'tour',
  setFilterOptionAsia: (option) =>
    set((state) => ({ ...state, filterOptionAsia: option })),
  filterOptionIndia: 'tour',
  setFilterOptionIndia: (option) =>
    set((state) => ({ ...state, filterOptionIndia: option })),
}));

export const useSearchStore = create((set) => ({
  filterOption: 'tour',
  setFilterOption: (option) => set({ filterOption: option }),
  destinationId: '',
  setDestinationId: (id) => set({ destinationId: id }),

  // Adding dates to the Zustand store
  dates: [
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, 'month'),
  ],
  setDates: (newDates) => set({ dates: newDates }),
  guestCounts: {
    Adults: 2,
    Children: 1,
    Rooms: 1,
  },

  // Setter function for guest counts
  setGuestCounts: (name, value) =>
    set((state) => ({
      guestCounts: {
        ...state.guestCounts,
        [name]: value,
      },
    })),
  selectFilteredTours: (toursData) =>
    set((state) => {
      // Here you would implement your filtering logic based on the state
      const { destinationId } = state;
      console.log(destinationId);
      console.log(toursData);
      return toursData.filter((tour) => {
        // Implement the actual filtering logic here.
        // This is just an example based on destinationId.
        return tour.destination.id === destinationId;
        // Add more conditions based on guestCounts, dates, etc.
      });
    }),
}));
export const initialFilterValues = {
  startTime: null,
  endTime: null,
  priceMax: 100000,
  location: null,
  priceMin: 0,
  continent: [],
  country: [],
  tagName: [],
};
export const useTourPaginationStore = create((set) => ({
  totalPage: 0, ///Total page from the frontend perspective
  currentPage: 0,
  totalPageLoaded: 0, ////Total page from the backend perspective
  totalResult: 0,
  dataPerPage: 9,
  loadCount: 9 * 3, ////Total number of tours to load per api fetch
  tourList: [],
  setTourPaginationData: (
    totalPage,
    currentPage,
    totalPageLoaded,
    totalResult,
    tourList
  ) =>
    set((state) => {
      const arr = new Array(totalResult).fill(undefined);
      for (let i = 0; i < tourList.length; i++) {
        arr[i] = tourList[i];
      }
      return {
        ...state,
        totalPage,
        currentPage,
        totalPageLoaded,
        totalResult,
        tourList: arr,
      };
    }),
  setCurrentPage: (currentPage) =>
    set((state) => {
      return { ...state, currentPage };
    }),
  setTourData: (newData, pageLoaded) =>
    set((state) => {
      const dataArr = state.tourList;
      const initialpos = (pageLoaded - 1) * state.loadCount;
      let j = 0;
      for (let i = initialpos; i < newData.length + initialpos; i++) {
        dataArr[i] = newData[j];
        j++;
      }
      return {
        ...state,
        totalPageLoaded: pageLoaded,
        tourList: dataArr,
      };
    }),
}));

export const useTourFilterStore = create((set) => ({
  startTime: null,
  endTime: null,
  priceMax: 100000,
  location: null,
  priceMin: 0,
  continent: [],
  country: [],
  tagName: [],
  // setStartTime
  setPriceMin: (priceMin) => set((state) => ({ ...state, priceMin })),
  setPriceMax: (priceMax) => set((state) => ({ ...state, priceMax })),
  setLocation: (location) =>
    set((state) => ({ ...state, ...initialFilterValues, location })),
  setTag: (tagName) =>
    set((state) => ({ ...state, tagName: [...state.tagName, tagName] })),
  setContinent: (continent) =>
    set((state) => ({
      ...state,
      continent: [...state.continent, continent],
      location: null,
    })),
  setCountry: (country) =>
    set((state) => ({
      ...state,
      country: [...state.country, country],
      location: null,
    })),
  removeTag: (tagName) =>
    set((state) => ({
      ...state,
      tagName: state.tagName.filter((el) => el != tagName),
    })),
  removeContinent: (continent) =>
    set((state) => ({
      ...state,
      continent: state.continent.filter((el) => el != continent),
    })),
  removeCountry: (country) =>
    set((state) => ({
      ...state,
      country: state.country.filter((el) => el != country),
    })),
  resetData: () =>
    set(() => {
      return initialFilterValues;
    }),
}));

export const useDestinationPaginationStore = create((set) => ({
  totalPage: 0, ///Total page from the frontend perspective
  currentPage: 0,
  totalPageLoaded: 0, ////Total page from the backend perspective
  totalResult: 0,
  dataPerPage: 9,
  loadCount: 9 * 3, ////Total number of tours to load per api fetch
  destinationList: [],
  setDestinationPaginationData: (
    totalPage,
    currentPage,
    totalPageLoaded,
    totalResult,
    destinationList
  ) =>
    set((state) => {
      const arr = new Array(totalResult).fill(undefined);
      for (let i = 0; i < destinationList.length; i++) {
        arr[i] = destinationList[i];
      }
      return {
        ...state,
        totalPage,
        currentPage,
        totalPageLoaded,
        totalResult,
        destinationList: arr,
      };
    }),
  setCurrentPage: (currentPage) =>
    set((state) => {
      return { ...state, currentPage };
    }),
  setDestinationData: (newData, pageLoaded) =>
    set((state) => {
      const dataArr = state.destinationList;
      const initialpos = (pageLoaded - 1) * state.loadCount;
      let j = 0;
      for (let i = initialpos; i < newData.length + initialpos; i++) {
        dataArr[i] = newData[j];
        j++;
      }
      return {
        ...state,
        totalPageLoaded: pageLoaded,
        destinationList: dataArr,
      };
    }),
}));

export const useDestinationFilterStore = create((set) => ({
  startTime: null,
  endTime: null,
  priceMax: 100000,
  location: null,
  priceMin: 0,
  continent: [],
  country: [],
  tagName: [],
  // setStartTime
  setPriceMin: (priceMin) => set((state) => ({ ...state, priceMin })),
  setPriceMax: (priceMax) => set((state) => ({ ...state, priceMax })),
  setLocation: (location) =>
    set((state) => ({ ...state, ...initialFilterValues, location })),
  setTag: (tagName) =>
    set((state) => ({ ...state, tagName: [...state.tagName, tagName] })),
  setContinent: (continent) =>
    set((state) => ({
      ...state,
      continent: [...state.continent, continent],
      location: null,
    })),
  setCountry: (country) =>
    set((state) => ({
      ...state,
      country: [...state.country, country],
      location: null,
    })),
  removeTag: (tagName) =>
    set((state) => ({
      ...state,
      tagName: state.tagName.filter((el) => el != tagName),
    })),
  removeContinent: (continent) =>
    set((state) => ({
      ...state,
      continent: state.continent.filter((el) => el != continent),
    })),
  removeCountry: (country) =>
    set((state) => ({
      ...state,
      country: state.country.filter((el) => el != country),
    })),
  resetData: () =>
    set(() => {
      return initialFilterValues;
    }),
}));

export const useAttractionPaginationStore = create((set) => ({
  totalPage: 0, ///Total page from the frontend perspective
  currentPage: 0,
  totalPageLoaded: 0, ////Total page from the backend perspective
  totalResult: 0,
  dataPerPage: 9,
  loadCount: 9 * 3, ////Total number of tours to load per api fetch
  attractionList: [],
  setAttractionPaginationData: (
    totalPage,
    currentPage,
    totalPageLoaded,
    totalResult,
    attractionList
  ) =>
    set((state) => {
      const arr = new Array(totalResult).fill(undefined);
      for (let i = 0; i < attractionList.length; i++) {
        arr[i] = attractionList[i];
      }
      return {
        ...state,
        totalPage,
        currentPage,
        totalPageLoaded,
        totalResult,
        attractionList: arr,
      };
    }),
  setCurrentPage: (currentPage) =>
    set((state) => {
      return { ...state, currentPage };
    }),
  setAttractionData: (newData, pageLoaded) =>
    set((state) => {
      const dataArr = state.attractionList;
      const initialpos = (pageLoaded - 1) * state.loadCount;
      let j = 0;
      for (let i = initialpos; i < newData.length + initialpos; i++) {
        dataArr[i] = newData[j];
        j++;
      }
      return {
        ...state,
        totalPageLoaded: pageLoaded,
        attractionList: dataArr,
      };
    }),
}));

export const useAttractionFilterStore = create((set) => ({
  startTime: null,
  endTime: null,
  priceMax: 100000,
  location: null,
  priceMin: 0,
  continent: [],
  country: [],
  tagName: [],
  // setStartTime
  setPriceMin: (priceMin) => set((state) => ({ ...state, priceMin })),
  setPriceMax: (priceMax) => set((state) => ({ ...state, priceMax })),
  setLocation: (location) =>
    set((state) => ({ ...state, ...initialFilterValues, location })),
  setTag: (tagName) =>
    set((state) => ({ ...state, tagName: [...state.tagName, tagName] })),
  setContinent: (continent) =>
    set((state) => ({
      ...state,
      continent: [...state.continent, continent],
      location: null,
    })),
  removeTag: (tagName) =>
    set((state) => ({
      ...state,
      tagName: state.tagName.filter((el) => el != tagName),
    })),
  removeContinent: (continent) =>
    set((state) => ({
      ...state,
      continent: state.continent.filter((el) => el != continent),
    })),

  setCountry: (country) =>
    set((state) => ({
      ...state,
      country: [...state.country, country],
      location: null,
    })),
  removeCountry: (country) =>
    set((state) => ({
      ...state,
      country: state.country.filter((el) => el != country),
    })),
  resetData: () =>
    set(() => {
      return initialFilterValues;
    }),
}));
