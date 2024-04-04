# Spotify Artist Song Keyword Search

This is an app built in React (TypeScript) & CSS that leverages the Spotify Web API. The app is deployed [at this link](https://spotify-artist-song-keyword-search.vercel.app/). The backend is currently an Express.js server - [GitHub link here](https://github.com/adamawalters/spotify-backend/). There are 2 key parts to the app, the main page and the personal profile page - the profile page requires signing in.    

### Main page capabilties:
1. Search for an artist
2. Enter a keyword and see how many of the selected artist's song titles contain that keyword
3. View the list of song titles that contain the keyword
4. View recent queries that have been made by any website user on the website
  
In other words, it answers the question "how many songs does an artist have, that contain *keyword* in the title?". The results can be enlightening. For example, Celine Dion contains 40 songs that contain "Love" in the title. 

### Profile page capabilties:
1. Search for an artist, keyword, and view results like on the main page
2. Save queries and delete queries from their personal profile
3. Add tags to their personal past queries, which they can edit and delete
4. View their top Spotify songs


## Key processes in the application
1. The app makes the web request, multiple times if necessary to load all of the song titles
2. The app attempts to de-duplicate similar versions of songs so that they only show up once (for example, live versions & remixes)
3. The app displays the list to the user

## Key items learned
- Authorization with tokens
- How to type in TypeScript the responses received from the API
- Refreshed CSS flexbox & positioning skills (sticky, fixed)
- PKCE process for front-end authorization
- MongoDB collections, joins between queries and tags, and the use of Mongoose library in Express to create CRUD routes for queries and tags

## Screenshots
**Searching for an artist**
![Searching for an artist](https://github.com/adamawalters/spotify/blob/main/screenshots/artist-search.png)

**Selecting an artist**
![Selecting an artist](https://github.com/adamawalters/spotify/blob/main/screenshots/artist-selection.png)

**Keyword search**
![Keyword search](https://github.com/adamawalters/spotify/blob/main/screenshots/keyword-search.png)

**Keyword results**
![Keyword results](https://github.com/adamawalters/spotify/blob/main/screenshots/keyword-results.png)

