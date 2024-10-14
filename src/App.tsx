import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useFetch from "react-fetch-hook";
import ReactLoading from "react-loading";

function NetlifyFunction() {
  const { isLoading, data } = useFetch<{ message: string }>(
    "/.netlify/functions/hello-world"
  );
  return (
    <div className="flex justify-center mt-8">
      {isLoading ? (
        <ReactLoading type="bubbles" />
      ) : (
        <span className="max-w-96">From netlify function: {data?.message}</span>
      )}
    </div>
  );
}

function AzureFunction() {
  const { isLoading, data } = useFetch<{ message: string }>("/api/hello-world");
  return (
    <div className="flex justify-center mt-8">
      {isLoading ? (
        <ReactLoading type="bubbles" />
      ) : (
        <span className="max-w-96">From azure function: {data?.message}</span>
      )}
    </div>
  );
}

function App() {
  const { isLoading, data } = useFetch<{ facts: string[] }>("/dogs");
  const isNetlify =
    window.location.hostname.includes("netlify") ||
    window.location.host.includes("8888");

  return (
    <>
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="flex justify-center mt-8">
        {isLoading ? (
          <ReactLoading type="bubbles" />
        ) : (
          <span className="max-w-96">{data?.facts[0]}</span>
        )}
      </div>

      {isNetlify ? <NetlifyFunction /> : <AzureFunction />}
    </>
  );
}

export default App;
