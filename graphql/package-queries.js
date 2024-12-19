import { gql } from '@apollo/client';

export const GET_All_PACKAGES = gql`
  query Getallpackages {
    getallpackages {
      id
      summaryData {
        photos {
          url
        }
      }
      title
      type
      pricingData {
        adultPrice
        currency
        type
      }
      durationData {
        days
        nights
      }
    }
  }
`;

export const GET_COMPLETE_PACKAGE_DETAIL = gql`
  query GetHoliday($getHolidayId: String!) {
    getHoliday(id: $getHolidayId) {
      datesData {
        bookingFromDate
        bookingToDate
        travelDates {
          fromDate
          toDate
        }
      }
      id
      destinations {
        destinationName
        id
      }
      durationData {
        days
        nights
        validity
        validityUnit
      }
      daywiseItinerary {
        cities {
          id
          name
        }
        day
        description
        exclusions
        inclusions
        meals
      }
      languages
      locationData {
        hotels {
          cities {
            id
            name
          }
          days
          meals
          name
          nights
          rating
        }
        intercityData {
          description
          fromCity {
            id
            name
          }
          mode
          toCity {
            id
            name
          }
        }
        sightData {
          city {
            name
            id
          }
          sights
        }
        transfers {
          airportTransfers
          localTransfers
        }
      }
      cancellationPolicy {
        description
        option
      }
      preference
      pricingData {
        adultPrice
        childPrice
        currency
        maxMembers
        type
      }
      summaryData {
        exclusions
        highlights {
          description
          url
          title
        }
        photos {
          url
        }
        inclusions
        summary
      }
      themes
      title
      type
    }
  }
`;
