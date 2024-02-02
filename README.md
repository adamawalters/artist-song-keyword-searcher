# Spotify Artist Song Keyword Search

This is an app built in React (TypeScript) & CSS that leverages the Spotify Web API. The app is deployed [at this link](https://spotify-song-keyword-search.vercel.app/). It is front-end only - there is no backend at this point.   

It lets users: 
1. Search for an artist
2. Enter a keyword and see how many of the selected artist's song titles contain that keyword
3. View the list of song titles that contain the keyword
  
In other words, it answers the question "how many songs does an artist have, that contain *keyword* in the title?". 

The results can be enlightening. For example, Celine Dion contains 40 songs that contain "Love" in the title. 

## Key processes in the application
1. The app makes the web request, multiple times if necessary to load all of the song titles
2. The app attempts to de-duplicate similar versions of songs so that they only show up once (for example, live versions & remixes)
3. The app displays the list to the user

## Key items learned
- Authorization with tokens
- How to type in TypeScript the responses received from the API
- Refreshed CSS flexbox & positioning skills (sticky, fixed)

## Screenshots
Searching for an artist
![A test image](https://github.com/adamawalters/spotify/blob/main/screenshots/artist-search.png)
