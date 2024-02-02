import { useEffect, useState } from "react";
import Search from "./Search";
import Login from "./Login";
import ErrorAlert from "./ErrorAlert";
import { Token } from "../Types";

const AppRoutes = () => {
  const [token, setToken] = useState<string | null | undefined>("");
  const [error, setError] = useState<null | { message: string }>(null);


  useEffect(() => {
    const hash = window.location.hash;
    let localStorageHasToken: boolean = localStorage.getItem("token") != null;
    const now = new Date();

    if (!localStorageHasToken && hash) {
      const tokenFromUrl = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];
      window.location.hash = "";
      if (tokenFromUrl) {
        const tokenToSet = {
          value: tokenFromUrl,
          /* getTime() returns number of milliseconds. Adding 1 hour in milliseconds*/
          expiration: now.getTime() + 60 * 60 * 1000,
        };
        window.localStorage.setItem("token", JSON.stringify(tokenToSet));
        localStorageHasToken = true;
      } else {
        setError({
          message: "Token not found, though hash is present in the URL",
        });
      }
    }

    if (localStorageHasToken) {
      const tokenFromLocalStorage: Token = JSON.parse(
        localStorage.getItem("token")!
      );
      const tokenExpirationTime = tokenFromLocalStorage.expiration;
      if (now.getTime() > tokenExpirationTime) {
        localStorage.removeItem("token");
        setToken(null);
      } else {
        setToken(tokenFromLocalStorage.value);
      }
    }
  }, []);

  return (
    <main>
      {error ? (
        <>
          <ErrorAlert error={error} />{" "}
        </>
      ) : null}
      {token ? (
        <>
          <Search token={token} />
        </>
      ) : (
        <Login />
      )}
    </main>
  );
};

export default AppRoutes;
