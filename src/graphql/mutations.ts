import { gql } from '@apollo/react-hooks'

export const CREATE_APP = gql`
  mutation CreateApp($data: CreateApp!) {
    createApp(data: $data) {
      id
      name
    }
  }
`

export const UPDATE_APP = gql`
  mutation UpdateApp($appId: String!, $data: UpdateApp!) {
    updateApp(id: $appId, data: $data) {
      id
      name
    }
  }
`

export const REFRESH_APP_SECRET = gql`
  mutation RefreshAppSecret($appId: String!) {
    refreshAppSecret(id: $appId) {
      id
      name
    }
  }
`

export const DELETE_APP = gql`
  mutation DeleteApp($appId: String!) {
    deleteApp(id: $appId) {
      id
      name
    }
  }
`

export const CREATE_REDIRECT_URI = gql`
  mutation CreateRedirectUri($data: CreateRedirectUri!) {
    createRedirectUri(data: $data) {
      id
      uri
    }
  }
`

export const DELETE_REDIRECT_URI = gql`
  mutation DeleteRedirectUri($redirectUriId: String!) {
    deleteRedirectUri(id: $redirectUriId) {
      id
      uri
    }
  }
`
