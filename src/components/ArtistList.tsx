import { Artist } from '../Types'

export type ArtistListProps = {
  artists: Array<Artist>
}

const ArtistList = ({artists}: ArtistListProps) => {

  const renderedArtists = artists.map((artist) => {
    return (
      <div>
        {artist.name}
        {artist.images.length ?
        <img width={100}
         src={artist.images[0].url}
         />: null}
      </div>
    )
  })

  return (
    <div>{renderedArtists}</div>
  )
}

export default ArtistList