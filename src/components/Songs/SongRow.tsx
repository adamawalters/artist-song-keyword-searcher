import React from 'react'
import { Song } from '../../Types'

export type SongRowProps = {
    song: Song
}

const SongRow = ({song}: SongRowProps) => {
  return (
    <tr>
        <td>{song.name}</td>
    </tr>
  )
}

export default SongRow