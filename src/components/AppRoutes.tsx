import { useEffect, useState } from "react";
import Search from "./Search";
import Login from "./Login";
import ErrorAlert from "./ErrorAlert";

const AppRoutes = () => {
  const [token, setToken] = useState<string | null | undefined>("");
  const [error, setError] = useState<null | { message: string }>(null);
  console.log(`token state: ${token}`);

  useEffect(() => {
    const hash = window.location.hash;
    let findToken: string | null | undefined = localStorage.getItem("token");

    if (!findToken && hash) {
      findToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];
        window.location.hash = "";
      if (findToken) {
        console.log("setting token from URL");
        window.localStorage.setItem("token", findToken);
      } else {
        setError({
          message: "Token not found though hash is present in the URL",
        });
      }
    }

    setToken(findToken);
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default AppRoutes;
