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