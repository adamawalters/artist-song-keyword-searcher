export interface Artist {
  name: string;
  followers: object;
  genres: string[];
  href: string;
  id: string;
  images: Array<GenericObject>;
  popularity: number;
  type: string;
  uri: string;
}

export interface Song {
  name: string;
  id: string;
  uri: string;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
}

export interface GenericObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface TrackResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Array<Song>;
}

export interface UserAuthToken {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  expiration: number;
  refresh_token: string;
  profile: SpotifyUserProfile;
}

export interface SpotifyUserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: { 
    filter_enabled: boolean; 
    filter_locked: boolean; 
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Array<GenericObject>;
  product: string;
  type: string;
  uri: string;
}

export interface ArtistSearchResponse {
  artists: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: number;
    total: number;
    items: Array<Artist>;
  };
}

export interface ArtistResponse {
  totalArtists: number;
  artists: Array<Artist>;
}

export interface SongResponse {
  totalTracks: number;
  tracks: Array<Song>;
}

export interface SavedQuery {
  search_keyword: string;
  artist_name: string;
  num_songs: number;
  created_at?: string;
}

export interface UserSavedQuery {
  _id: string,
  search_keyword: string;
  artist_name: string;
  num_songs: number;
  created_at?: string;
  spotify_id: string;
  tags: Array<TagType>
}

export interface TagType {
  _id: string,
  tag_content: string
}
