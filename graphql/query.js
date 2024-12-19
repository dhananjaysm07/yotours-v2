import { gql } from "@apollo/client";

export const GET_COUNTRIES_CONTINENTS_QUERY = gql`
  query GetCountriesAndContinents {
    getCountriesAndContinents {
      country
      continent
      destinationCount
    }
  }
`;

export const GET_COUNTRIES_CONTINENTS_TOURS_QUERY = gql`
  query GetCountriesAndContinentsForTours {
    getCountriesAndContinentsForTours {
      country
      continent
      tourCount
    }
  }
`;

export const GET_COUNTRIES_CONTINENTS_ATTRACTIONS_QUERY = gql`
  query GetCountriesAndContinentsForAttractions {
    getCountriesAndContinentsForAttractions {
      country
      continent
      attractionCount
    }
  }
`;

export const GET_DESTINATIONS_QUERY = gql`
  query GetDestinations {
    getDestinations {
      id
      destinationName
      description
      bannerImage
      isPopular
      continent
      country
      bannerHeading
      fromDate
      toDate
      fromOccasion
      toOccasion
      introduction
      images {
        id
        imageUrl
      }
      tours {
        id
        active
      }
      attractions {
        id
        active
      }
    }
  }
`;
export const GET_FILTERED_DESTINATION = gql`
  query GetFilteredDestination(
    $page: Int!
    $loadCount: Int!
    $filter: TourFilterInput!
  ) {
    getFilteredDestination(
      page: $page
      loadCount: $loadCount
      filter: $filter
    ) {
      destinations {
        id
        destinationName
        bannerImage
        images {
          id
          imageUrl
        }
      }
      totalCount
    }
  }
`;
// query GetDestinations {
//   getDestinations {
//     id
//     destinationName
//     continent
//     country
//     bannerImage
//     bannerHeading
//     description
//     images {
//       id
//       imageUrl
//     }
//     tours {
//       id
//       tourTitle
//       price
//       location
//       images {
//         id
//         imageUrl
//       }
//       destination {
//         id
//         destinationName
//       }
//       tag {
//         id
//         name
//         active
//       }

//     }
//     attractions {
//       id
//       attractionTitle
//       price
//       location
//       images {
//         id
//         imageUrl
//       }
//       tag {
//         id
//         name
//         active
//       }
//     }
//     tag {
//         id
//         name
//         active
//       }

//   }
// }

export const GET_DESTINATION = gql`
  query GetDestination($getDestinationId: String!) {
    getDestination(id: $getDestinationId) {
      id
      destinationName
      bannerImage
      bannerHeading
      continent
      country
      description
      images {
        id
        imageUrl
      }
      tag {
        id
        name
        active
      }
      tours {
        id
        tourTitle
        price
        currency
        location
        tourBokunId
        tag {
          id
          name
          active
        }
        active
      }
      attractions {
        id
        attractionTitle
        price
        location
        active
      }
    }
  }
`;

export const GET_TOURS_QUERY = gql`
  query GetTours {
    getTours {
      id
      tourTitle

      images {
        id
        imageUrl
      }
      tourHyperlink
      tourBokunId
      location
      destination {
        id
        destinationName
        continent
        country
      }
      price
      currency
      tag {
        id
        name
        active
      }
    }
  }
`;

export const GET_FILTERED_TOURS = gql`
  query GetFilteredTours(
    $page: Int!
    $loadCount: Int!
    $filter: TourFilterInput!
  ) {
    getFilteredTours(page: $page, loadCount: $loadCount, filter: $filter) {
      tours {
        id
        tourTitle
        images {
          id
          imageUrl
        }
        tourBokunId
        location
        price
        currency
        tag {
          id
          name
          active
        }
      }
      totalCount
    }
  }
`;

export const GET_ATTRACTIONS_QUERY = gql`
  query GetAttractions {
    getAttractions {
      id
      attractionTitle
      images {
        id
        imageUrl
      }
      location
      attractionBokunId
      attractionHyperlink
      destination {
        id
        destinationName
        continent
        country
      }
      price
      currency
      tag {
        id
        name
        active
      }
    }
  }
`;
export const GET_FILTERED_ATTRACTIONs = gql`
  query GetFilteredAttractions(
    $page: Int!
    $loadCount: Int!
    $filter: TourFilterInput!
  ) {
    getFilteredAttractions(
      page: $page
      loadCount: $loadCount
      filter: $filter
    ) {
      attractions {
        id
        attractionTitle
        images {
          id
          imageUrl
        }
        location
        attractionBokunId
        attractionHyperlink
        price
        currency
        tag {
          id
          name
          active
        }
      }
      totalCount
    }
  }
`;
export const GET_CONTENT_QUERY = gql`
  query GetContent {
    getContent {
      id
      heroHeading
      heroSubheading
      heroImage
      footerLinks
      footerLogo
      socialLinks
      tnc
      privacy
      about
      agent
      bokunChannelId
      leftDiscountImage
      rightDiscountImage
    }
  }
`;

export const GET_THINGS_QUERY = gql`
  query GetThings {
    getThings {
      id
      thingTitle
      thingDescription
      thingHyperlink
      destination {
        id
        destinationName
      }
      images {
        id
        imageUrl
      }
      tag {
        id
        name
      }
    }
  }
`;

export const GET_CARS_QUERY = gql`
  query GetCars {
    getCars {
      id
      carTitle
      carDescription
      carHyperlink
      carBokunId
      destination {
        id
        destinationName
      }
      images {
        id
        imageUrl
      }
      tag {
        id
        name
      }
      price
      currency
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      name
    }
  }
`;

export const GET_TOUR_LOCATIONS = gql`
  query Query {
    getUniqueTourLocations
  }
`;

export const GET_ATTRACTION_LOCATIONS = gql`
  query Query {
    getUniqueAttractionLocations
  }
`;

export const GET_DESTINATION_LOCATIONS = gql`
  query Query {
    getUniqueDestinationLocations
  }
`;
