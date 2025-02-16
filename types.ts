export type Destination = {
  id: string | number;
  destinationName: string;
  bannerImage: string;
  tours?: { active: boolean }[];
  attractions?: { active: boolean }[];
};

export type DestinationFilterType = {
  activeValues: boolean[];
  continent: string[];
  country?: string[];
};

export interface Tag {
  id: string;
  name: string;
  count?: number; // Optional count of attractions for this tag
}

export interface GetFilteredDestinationResponse {
  getFilteredDestination: {
    destinations: Destination[];
    totalCount: number;
  };
}

export interface DestinationCountriesContinentsData {
  getCountriesAndContinents: {
    country: string;
    continent: string;
    destinationCount: number;
  }[];
}

export interface AttractionCountriesContinentsData {
  getCountriesAndContinentsForAttractions: {
    country: string;
    continent: string;
    attractionCount: number;
  }[];
}

export interface UniqueDestinations {
  getUniqueDestinationLocations: string[];
}

export interface Attraction {
  id: string;
  attractionTitle: string;
  bannerImage: string;
  location: string;
  price: number;
  currency: string;
  images: { imageUrl: string }[];
  tag: { name: string };
  attractionBokunId: string;
}

export interface GetFilteredAttractionsResponse {
  getFilteredAttractions: {
    attractions: Attraction[];
    totalCount: number;
  };
}

export interface TagData {
  getAllTags: {
    name: string;
  }[];
}
