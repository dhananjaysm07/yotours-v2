import { gql } from "@apollo/client";

export const GetDestinationsInHome = gql`
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
      totalCount
      destinations {
        id
        bannerImage
        bannerHeading
        attractions {
          active
          id
        }
        images {
          imageUrl
        }
        tours {
          id
          active
        }
        country
        continent
        destinationName
        description
      }
    }
  }
`;

export const GetToursInHome = gql`
  query GetFilteredTours(
    $page: Int!
    $loadCount: Int!
    $filter: TourFilterInput!
  ) {
    getFilteredTours(page: $page, loadCount: $loadCount, filter: $filter) {
      totalCount
      tours {
        id
        active
        currency
        destination {
          continent
          country
        }
        images {
          imageUrl
        }
        location
        price
        priority
        tag {
          id
          name
          active
        }
        tourBokunId
        tourHyperlink
        tourTitle
      }
    }
  }
`;

export const GetAttractionsInHome = gql`
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
      totalCount
      attractions {
        active
        attractionBokunId
        attractionHyperlink
        attractionTitle
        currency
        destination {
          id
          country
          continent
        }
        images {
          imageUrl
        }
        price
        tag {
          id
          active
          name
        }
        location
        id
      }
    }
  }
`;
