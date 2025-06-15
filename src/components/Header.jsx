export default function Header({ viteLogo, reactLogo }) {
  return (
    <header className="container-fluid py-4 mb-4">
      <h1 className="text-center display-6 m-0">
        <a
          href="https://vite.dev/"
          target="_blank"
          rel="external"
          title="Vite | Next Generation Frontend Tooling"
        >
          <img className="img-fluid" src={viteLogo} alt="Vite Logo" />
        </a>{" "}
        Random Contacts Dashboard{" "}
        <a
          href="https://react.dev/"
          target="_blank"
          rel="external"
          title="React"
        >
          <img className="img-fluid" src={reactLogo} alt="React Logo" />
        </a>
      </h1>
    </header>
  );
}
