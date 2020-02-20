import gql from 'graphql-tag';

export const fetchRestaurantsPlain = `
query fetchNearbyRestaurants (
  $bound: Int!,
  $lat: float8!,
  $long: float8!
) {
  get_nearby_restaurants (args: {
    bound: $bound,
    lat: $lat,
    long: $long,
  }) {
    name
    lat
    long
  }
}

`;
export const fetchRestaurants = gql`
  ${fetchRestaurantsPlain}
`;
