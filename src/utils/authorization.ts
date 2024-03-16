import { UserAuthToken } from "Types";

// const redirectUri =
//   import.meta.env.MODE === "production"
//     ? "https://spotify-artist-song-keyword-search.vercel.app"
//     : "http://localhost:3000";

const redirectUri = "http://localhost:3000";
const clientId = "c418f8eeb1764167baf4279404c77cba";

function generateRandomString(length: number) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce(function (acc, x) {
    return acc + possible[x % possible.length];
  }, "");
}

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64encode(input: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getCodeVerifierAndChallenge() {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  return { codeVerifier, codeChallenge };
}

async function authorizeUser() {
  const scope = "user-read-private user-read-email";
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  const { codeVerifier, codeChallenge } = await getCodeVerifierAndChallenge();

  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  
  window.location.href = authUrl.toString();
  
}

async function getToken(code: string) : Promise<UserAuthToken>{
  const codeVerifier = localStorage.getItem("code_verifier");
  if (!codeVerifier) {
    throw new Error("Code verifier not found");
  }
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    }),
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    payload
  );

  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to get token");
  }

  const token = await response.json();

  const requiredFields = [
    "access_token",
    "token_type",
    "expires_in",
    "refresh_token",
    "scope",
  ];
  if (!requiredFields.every((field) => Object.keys(token).includes(field))){
    throw new Error("Invalid token data");
  }

  token.expiration = Date.now() + token.expires_in * 1000;

  localStorage.setItem("spotify-auth-token", JSON.stringify(token));
  localStorage.removeItem("code_verifier");

  return token as UserAuthToken;
}

// checks if token is expired and refreshes it if necessary before performing a fetch
export async function fetchWithUserToken(token: UserAuthToken, url: string, options: RequestInit) {
  
  if(token.expiration < Date.now()){
    token = await getRefreshToken(token);
  }

  //will need to add the token to the headers
  const response = await fetch(url, {
    ...options, 
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token.access_token}`
    } 
  });

  const payload = await response.json();
  return payload;

}

async function getRefreshToken(token: UserAuthToken) : Promise<UserAuthToken> {

  const refreshToken = token.refresh_token;

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId
    }),
  }
  const response = await fetch(`https://accounts.spotify.com/api/token`, payload);

  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to get token");
  }

  const newToken = await response.json();

  const requiredFields = [
    "access_token",
    "token_type",
    "expires_in",
    "refresh_token",
    "scope",
  ];
  if (!requiredFields.every((field) => Object.keys(token).includes(field))){
    throw new Error("Invalid token data");
  }

  newToken.expiration = Date.now() + newToken.expires_in * 1000;

  localStorage.setItem('spotify-auth-token', JSON.stringify(newToken));

  return newToken;
}

export { authorizeUser, getToken };
