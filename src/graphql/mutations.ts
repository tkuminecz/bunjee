import { gql } from '@apollo/react-hooks';

export const CREATE_APP = gql`
  mutation CreateApp($data: CreateApp!) {
    createApp(data: $data) {
      id
      name
    }
  }
`;

export const DELETE_APP = gql`
  mutation DeleteApp($appId: String!) {
    deleteApp(id: $appId) {
      id
      name
    }
  }
`;

export const CREATE_REDIRECT_URI = gql`
  mutation CreateRedirectUri($data: CreateRedirectUri!) {
    createRedirectUri(data: $data) {
      id
      uri
    }
  }
`;

export const DELETE_REDIRECT_URI = gql`
  mutation DeleteRedirectUri($redirectUriId: String!) {
    deleteRedirectUri(id: $redirectUriId) {
      id
      uri
    }
  }
`;
