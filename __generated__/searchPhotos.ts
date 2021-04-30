/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchPhotos
// ====================================================

export interface searchPhotos_searchPhotos {
  __typename: "Photo";
  id: string;
  file: string;
}

export interface searchPhotos {
  searchPhotos: (searchPhotos_searchPhotos | null)[] | null;
}

export interface searchPhotosVariables {
  keyword: string;
  lastId?: number | null;
}
