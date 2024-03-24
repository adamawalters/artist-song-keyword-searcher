import { Artist, Song, UserSavedQuery } from "Types";
import ArtistSection from "../Artists/ArtistSection";
import SongSection from "../Songs/SongSection";
import { useState, useRef, useEffect, useCallback } from "react";
import { searchArtists, searchSongs, loadUserQueries, saveUserQueryToDatabase } from "../../utils/api";
import { useUserContext } from "../../utils/context"
import TopSongs from "./TopSongs"
import UserQueriesSection from "../UserQueries/UserQueriesSection";
import ProfileSongSection from "./ProfileSongSection";

function Profile() {

  const { userToken } = useUserContext();
  const [selectedArtist, setSelectedArtist] = useState<null | Artist>(null);
  const [userSavedQueries, setUserSavedQueries] = useState<Array<UserSavedQuery>>();
  const [error, setError] = useState<Error>();
  const [songs, setSongs] = useState<Array<Song>>();
  const [lastUsedKeyword, setLastUsedKeyword] = useState<string>("");
  const [lastUsedArtistName, setLastUsedArtistName] = useState<string>("");
  const [artists, setArtists] = useState<null | Array<Artist>>(null);
  const [searchKey, setSearchKey] = useState<string>("");
  const [totalArtistsInResponse, setTotalArtistsInResponse] = useState<null | number>(null); 
  const songSection = useRef<null | HTMLDivElement>(null);

  async function loadArtists(offset: number, searchStringFromArtistSearch?: string) {
    setError(undefined);
    /* Set the search key state to the string from artist search so function can be called by ArtistResultTable without a new search key when called later */
    if (searchStringFromArtistSearch) {
      setSearchKey(searchStringFromArtistSearch);
    }
    /*Use string from artist search if available (ArtistSearchSection/PastQueriesSection), otherwise searchKey within state (ResultTable) */
    const searchText = searchStringFromArtistSearch || searchKey;
    const abortController = new AbortController(); //TODO: abortController is not being used

    try {
      const response = await searchArtists(searchText, offset);
      setTotalArtistsInResponse(response.totalArtists);
      setArtists(response.artists);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }

    return () => abortController.abort();
  }

  async function submitSongSearch(searchKeyword: string, artist: string) {
    setError(undefined);
    /* Used to display the last searched for keyword & artist */
    setLastUsedKeyword(searchKeyword);
    setLastUsedArtistName(artist);
    setSelectedArtist({ name: artist } as Artist);
    setSongs(undefined); // so song table doesn't display old songs while new ones are loading

    try {
      const response = await searchSongs(searchKeyword, artist);
      setSongs(response.tracks);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  }

  /* Only scroll to SongSection if on mobile */
  useEffect(() => {
    if (selectedArtist && !window.matchMedia("(min-width: 768px)").matches) {
      songSection.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedArtist]);

  /* Load recent queries  - used in Profile after mount and in SongSection after searching for a song */
  const fetchQueries = useCallback(async () => {
    setError(undefined);
    try {
      const response = await loadUserQueries(0, userToken!.profile.id);
      setUserSavedQueries(response);
    } catch (error) {
        setError(error as Error);
    }
  }, [userToken]);

  // Load recent queries after mount
  useEffect(() => {
    const abortController = new AbortController();
    fetchQueries();
    return () => abortController.abort();
  }, [fetchQueries]);

  return (
    <main>
      {/* userToken is truthy always b/c of conditional statement on App.tsx */}
      <h1>Hi, {userToken!.profile.display_name}</h1>
      <p>On this page you can perform searches and save and edit your searches. You can also see your top songs!</p>
      <TopSongs />
      {error ? <div>{error.message}</div> : null}
      <div className="artist-and-song-wrapper">
        <section id="artist-section">
          <ArtistSection
            artists={artists}
            totalArtistsInResponse={totalArtistsInResponse}
            searchKey={searchKey}
            loadArtists={loadArtists}
            selectedArtist={selectedArtist}
            setSelectedArtist={setSelectedArtist}
            lastUsedArtistName={lastUsedArtistName}
          />
        </section>
        {selectedArtist ? (
          <section id="song-section" ref={songSection}>
            <ProfileSongSection
              songs={songs}
              lastUsedArtistName={lastUsedArtistName}
              lastUsedKeyword={lastUsedKeyword}
              submitSongSearch={submitSongSearch}
              fetchQueries={fetchQueries}
              selectedArtist={selectedArtist}
            />
          </section>
        ) : null}
      </div>
      {userSavedQueries ? (
        <section>
          <UserQueriesSection
            userSavedQueries={userSavedQueries}
            submitSongSearch={submitSongSearch}
            loadArtists={loadArtists}
          />
        </section>
      ) : null}
    </main>
  )
}

export default Profile