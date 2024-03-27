import logo from "@/assets/img/logo.svg";
import "@/pages/popup/Popup.css";
import withErrorBoundary from "@/shared/hoc/withErrorBoundary";
import withSuspense from "@/shared/hoc/withSuspense";
import useStorage from "@/shared/hooks/useStorage";
import exampleThemeStorage from "@/shared/storages/exampleThemeStorage";

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#000",
      }}
    >
      <header
        className="App-header"
        style={{ color: theme === "light" ? "#000" : "#fff" }}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-destructive">
          Edit <code>src/pages/popup/Popup.tsx</code> and save to reloadfsfd.sss
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: theme === "light" ? "#0281dc" : "red",
            marginBottom: "10px",
          }}
        >
          Learn React!
        </a>
        <button
          style={{
            backgroundColor: theme === "light" ? "#fff" : "#000",
            color: theme === "light" ? "#000" : "#fff",
          }}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={exampleThemeStorage.toggle}
        >
          Toggle theme
        </button>
      </header>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(Popup, <div> Loading ... </div>),
  <div> Error Occur </div>,
);
