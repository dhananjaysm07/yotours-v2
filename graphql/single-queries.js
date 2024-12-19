import { gql } from "@apollo/client";

export const GET_SINGLE_DESTINATION = gql`
  query GetDestinationByCity($destinationName: String!) {
    getDestinationByCity(destinationName: $destinationName) {
      id
      destinationName
      continent
      country
      bannerImage
      bannerHeading
      description
      isPopular
      fromDate
      toDate
      fromOccasion
      toOccasion
      images {
        id
        imageUrl
      }
      priority
      tag {
        id
        name
        active
      }
      tours {
        id
        active
        tourTitle

        images {
          id
          imageUrl
        }
        tourHyperlink
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
      attractions {
        id
        active
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
      introduction
      things {
        active
        id
        thingTitle
        thingDescription
        thingHyperlink
        images {
          id
          imageUrl
        }
        tag {
          id
          name
        }
      }
      cars {
        id
        active
        carTitle
        carDescription
        carHyperlink
        carBokunId
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
  }
`;

export const GET_DESTINATION = gql`
  query GetDestinationByCity($destinationName: String!) {
    getDestinationByCity(destinationName: $destinationName) {
      id
      destinationName
      continent
      country
      bannerImage
      bannerHeading
      description
      fromDate
      toDate
      fromOccasion
      toOccasion
      images {
        id
        imageUrl
      }
      priority
      introduction
    }
  }
`;

export const GET_TOUR_FOR_DESTINATION = gql`
  query GetDestinationByCity($destinationName: String!) {
    getDestinationByCity(destinationName: $destinationName) {
      tours {
        id
        active
        tourTitle

        images {
          id
          imageUrl
        }
        tourHyperlink
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
    }
  }
`;

export const GET_ATTRACTION_CARS_FOR_DESTINATION = gql`
  query GetDestinationByCity($destinationName: String!) {
    getDestinationByCity(destinationName: $destinationName) {
      attractions {
        id
        active
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
      cars {
        id
        active
        carTitle
        carDescription
        carHyperlink
        carBokunId
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
  }
`;

export const GET_THINGS_FOR_DESTINATION = gql`
  query GetDestinationByCity($destinationName: String!) {
    getDestinationByCity(destinationName: $destinationName) {
      things {
        active
        id
        thingTitle
        thingDescription
        thingHyperlink
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
  }
`;
