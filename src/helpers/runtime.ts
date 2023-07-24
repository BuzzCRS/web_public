// register env variables here with 1:1 .env
// this will allow to fetch env variables from other places
const ENVIRONMENT_VARIABLES = {
  gql_endpoint: process.env.GRAPHQL_API_ENDPOINT,
};

export const getEnv = (key: keyof typeof ENVIRONMENT_VARIABLES) => {
  return ENVIRONMENT_VARIABLES[key];
};
