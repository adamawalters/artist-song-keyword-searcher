import {  ArtistResponse, SavedQuery, SongResponse, TagType, UserSavedQuery } from "Types";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5001"

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

  export async function loadQueries(limit: number = 0) {
    const url = `${API_BASE_URL}/queries?limit=${limit}`
    const options = {
        method: "GET", 
    }

    const response = await fetchJson<Array<SavedQuery>>(url, options, [])
    return response;

  }

  export async function loadUserQueries(limit: number = 0, spotify_id: string) {
    const url = `${API_BASE_URL}/queries?limit=${limit}&spotify_id=${spotify_id}`
    const options = {
        method: "GET", 
    }

    const response = await fetchJson<Array<UserSavedQuery>>(url, options, [])
    return response;
  }


  export async function saveQueryToDatabase(query: SavedQuery) {
    const url = `${API_BASE_URL}/queries`
    const { search_keyword, artist_name, num_songs } = query
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            search_keyword,
            artist_name,
            num_songs
        }})
    }

    const response = await fetchJson(url, options, {})
    return response;
  }


export async function saveUserQueryToDatabase(query: UserSavedQuery) {
  const url = `${API_BASE_URL}/queries`
  const { search_keyword, artist_name, num_songs, spotify_id } = query;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({
      data : {
        search_keyword,
        artist_name,
        num_songs,
        spotify_id
      }
    })
  }

  const response = await fetchJson(url, options, {})
  return response;
}

export async function deleteUserQueryItem(id: string){
  const url = `${API_BASE_URL}/queries/${id}`
  const options = {
    method: "DELETE",
    headers
  }

  const response = await fetchJson(url, options, {})
  return response;
}

export async function deleteTag(id: string){
  const url = `${API_BASE_URL}/tags/${id}`
  const options = {
    method: "DELETE",
    headers,
  }
  const response = await fetchJson(url, options, {})
  return response;
}

export async function createTag(tagContent: string, queryId: string){
  const url = `${API_BASE_URL}/tags`
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: {
        tag_content: tagContent,
        query_id: queryId
      }
    })
  }

  const response = await fetchJson(url, options, {})
  return response;
}

export async function updateTag(tagId: string, tagContent: string) {
  const url = `${API_BASE_URL}/tags/${tagId}`
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({
      data: {
        tagContent: tagContent
      }
    })
  }

  const response = await fetchJson(url, options, {})
  return response;
}
