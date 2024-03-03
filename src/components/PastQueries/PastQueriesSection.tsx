import { SavedQuery } from "Types";
import { useEffect, useState } from "react";
import PastQueryItem from "./PastQueryItem";
import { loadQueries } from "./../../utils/api";
import ErrorAlert from "./../UtilityComponents/ErrorAlert";

function PastQueriesSection() {
  const [savedQueries, setSavedQueries] = useState<Array<SavedQuery>>();
  const [error, setError] = useState<Error>();


  useEffect(() => {
    const abortController = new AbortController();
    async function getQueries() {
      try {
        const response = await loadQueries(10);
        setSavedQueries(response);
      } catch (error) {
        if(error instanceof Error) {
            setError(error)
        }
      }
    }
    getQueries();
    return () => abortController.abort();
  }, []);

  if (savedQueries) {
    return (
      <div className="center-container">
        {error ? <ErrorAlert error={error} /> : null}
        <h1>Recent Queries</h1>
        {savedQueries
          ? savedQueries.map((query, index) => <PastQueryItem key={index} query={query} />)
          : null}
      </div>
    );
  }

  return (
    <div className="center-container">
     {error ? <ErrorAlert error={error} /> : null}
      <h1>Saved Queries</h1>
      <p>Loading...</p>
    </div>
  );
}

export default PastQueriesSection;
