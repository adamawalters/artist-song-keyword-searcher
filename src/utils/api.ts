import {  ArtistResponse, SongResponse } from "Types";


const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

const headers = new Headers();
headers.append("Content-Type", "application/json");
 

async function fetchJson<T>(url: string, options: RequestInit, onCancel: T): Promise<T>  {
    try {
      const response = await fetch(url, options);
  
    if (response.status === 204) {
        return onCancel;
      } 
  
      const payload = await response.json();
  
      if (payload.error) {
        return Promise.reject({ message: payload.error });
      }
      return payload.data;
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error(error.stack);
        throw error;
      }
      return Promise.resolve(onCancel);
    }
  }


  export async function searchArtists(keyword: string, offset: number) : Promise <ArtistResponse> {

    const params = new URLSearchParams ({
        artist_search_keyword: keyword,
        offset: offset.toString()
    })

    const url = `${API_BASE_URL}/artists?${params}`
    const options = {
        method: "GET", 
    }

    const response = await fetchJson<ArtistResponse>(url, options, {} as ArtistResponse)
    return response;
  }

  export async function searchSongs(keyword: string, artist_name: string) : Promise <SongResponse> {
    
    const params = new URLSearchParams({
        song_search_keyword: keyword,
        artist_name: artist_name,
    })
    const url = `${API_BASE_URL}/songs?${params}`
    const options = {
        method: "GET", 
    }

    const response = await fetchJson<SongResponse>(url, options, {} as SongResponse)
    return response;
  }

