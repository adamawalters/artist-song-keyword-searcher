
export interface Artist {
    name: string,
    followers: object,
    genres: string[],
    href: string,
    id: string, 
    images: Array<GenericObject>,
    popularity: number,
    type: string,
    uri: string
}

export interface Song {
    name: string
    id: string
    external_ids :{
        isrc: string,
        ean: string,
        upc: string
    }

}

export interface GenericObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

export interface TrackResponse {
    href: string,
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
    items: Array<Song>
}

export interface Token {
    value: string,
    expiration: number
}

export interface ArtistSearchResponse {
    artists: {
        href: string,
        limit: number,
        next: string,
        offset: number,
        previous: number,
        total: number, 
        items: Array<Artist>

    }
}

