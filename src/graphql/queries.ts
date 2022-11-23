import { gql } from '@apollo/react-hooks'

export const LIST_APPS = gql`
  query ListApps {
    apps {
      id
      name
    }
  }
`

export const GET_APP = gql`
  query GetApp($appId: String!) {
    app(id: $appId) {
      id
      name
      redirectUris {
        id
        uri
      }
    }
  }
`
