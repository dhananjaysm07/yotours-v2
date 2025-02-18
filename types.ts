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

export interface CountriesContinentsData {
  getCountriesAndContinents: {
    country: string;
    continent: string;
    destinationCount: number;
  }[];
}

export interface Tag {
  id: string;
  name: string;
  count?: number; // Optional count of attractions for this tag
}

export interface ContentData {
  id?: string;
  heroImage?: string;
  heroHeading?: string;
  heroSubheading?: string;
  rightDiscountImage: string;
  leftDiscountImage: string;
  footerLinks?: string[];
  footerLogo?: string;
  socialLinks?: string[];
  tnc?: string;
  privacy?: string;
  about?: string;
  agent?: string;
  bokunChannelId?: string;
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
  active?: boolean;
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

export interface GetDestinations {
  getDestinations: {
    id: number;
    destinationName: string;
  }[];
}
export interface TourImage {
  id: string;
  imageUrl: string;
}

export interface Tour {
  id: string;
  tourTitle: string;
  images: TourImage[];
  location: string;
  price: number;
  currency: string;
  tag: { name: string };
  active: boolean;
  tourBokunId: string;
}

export interface ToursByDestinationCity {
  getDestinationByCity: {
    tours: Tour[];
  };
}

export interface Image {
  id: string;
  imageUrl: string;
}

export interface Tag {
  id: string;
  name: string;
  active?: boolean;
}

export interface Car {
  id: string;
  active: boolean;
  carTitle: string;
  carDescription: string;
  carHyperlink: string;
  carBokunId: string;
  images: Image[];
  tag: Tag;
  price: number;
  currency: string;
}

export interface DestinationByCity {
  attractions: Attraction[];
  cars: Car[];
}

export interface GetDestinationByCityResponse {
  getDestinationByCity: DestinationByCity;
}
