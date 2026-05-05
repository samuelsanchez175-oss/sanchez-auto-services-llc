export type MapsAuthorAttr = {
  displayName?: string;
  uri?: string;
};

export type MapsListingPhotoEntry = {
  file: string;
  widthPx?: number;
  heightPx?: number;
  authorAttributions?: MapsAuthorAttr[];
  googleMapsPhotoUri?: string;
};

export type MapsReviewHighlight = {
  rating?: number;
  relativePublishTimeDescription?: string;
  textExcerpt: string;
  originalTextChars?: number;
  authorName: string;
  authorUri?: string;
  googleMapsReviewUri?: string;
  avatarFile?: string;
};

export type MapsGalleryManifest = {
  fetchedAt: string;
  sourceNote?: string;
  placeId: string;
  googleMapsListingUri?: string;
  displayName: string;
  rating?: number;
  userRatingCount?: number;
  placePhotos: MapsListingPhotoEntry[];
  reviews: MapsReviewHighlight[];
};
