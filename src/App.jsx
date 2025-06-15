import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import Header from "./components/Header";
import RandomUsers from "./pages/RandomUsers";
import MyContacts from "./pages/MyContacts";
import Settings from "./pages/Settings";
import { useLocalStorage } from "./hooks";

function App() {
  const [localdb, setLocaldb] = useLocalStorage("users", []);
  const [currentTab, setCurrentTab] = useLocalStorage(
    "appTab",
    localStorage.getItem("appTab") === null
      ? "search"
      : localStorage.getItem("appTab")
  );

  const handleTabs = (event) => {
    const element = event.target;

    if (element.id === "v-pills-search-tab") {
      setCurrentTab("search");
    } else if (element.id === "v-pills-myContacts-tab") {
      setCurrentTab("myContacts");
    } else if (element.id === "v-pills-settings-tab") {
      setCurrentTab("settings");
    } else {
      alert("Error setting current tab state: Can't determine the Tab ID!");
    }
  };

  return (
    <>
      <Header reactLogo={reactLogo} viteLogo={viteLogo} />
      <main className="container-fluid">
        <div
          className="row align-items-start justify-content-start"
          style={{ minHeight: "38.80rem" }}
        >
          <nav
            className="col-md-2 nav flex-column align-self-stretch nav-pills p-3 border border-1"
            style={{ rowGap: "1.5rem" }}
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              className={
                currentTab === "search" ? "nav-link active" : "nav-link"
              }
              id="v-pills-search-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-search"
              type="button"
              role="tab"
              aria-controls="v-pills-search"
              aria-selected={currentTab === "search" ? "true" : "false"}
              onClick={(event) => {
                handleTabs(event);
              }}
            >
              Search Users
            </button>

            <button
              className={
                currentTab === "myContacts" ? "nav-link active" : "nav-link"
              }
              id="v-pills-myContacts-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-myContacts"
              type="button"
              role="tab"
              aria-controls="v-pills-myContacts"
              aria-selected={currentTab === "myContacts" ? "true" : "false"}
              onClick={(event) => {
                handleTabs(event);
              }}
            >
              My Contacts
            </button>

            <button
              className={
                currentTab === "settings" ? "nav-link active" : "nav-link"
              }
              id="v-pills-settings-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-settings"
              type="button"
              role="tab"
              aria-controls="v-pills-settings"
              aria-selected={currentTab === "settings" ? "true" : "false"}
              onClick={(event) => {
                handleTabs(event);
              }}
            >
              Settings
            </button>
          </nav>

          <section
            className="col-md-10 tab-content align-self-stretch p-4 border border-1"
            id="v-pills-tabContent"
          >
            <div
              className={
                currentTab === "search"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="v-pills-search"
              role="tabpanel"
              aria-labelledby="v-pills-search-tab"
              tabIndex="0"
            >
              <RandomUsers localdb={localdb} setLocaldb={setLocaldb} />
            </div>

            <div
              className={
                currentTab === "myContacts"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="v-pills-myContacts"
              role="tabpanel"
              aria-labelledby="v-pills-myContacts-tab"
              tabIndex="0"
            >
              <MyContacts localdb={localdb} setLocaldb={setLocaldb} />
            </div>

            <div
              className={
                currentTab === "settings"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="v-pills-settings"
              role="tabpanel"
              aria-labelledby="v-pills-settings-tab"
              tabIndex="0"
            >
              <Settings setLocaldb={setLocaldb} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
