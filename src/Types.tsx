
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
}

export interface GenericObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

