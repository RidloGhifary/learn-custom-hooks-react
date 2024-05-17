import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMediaQuery } from "./hooks/useMediaQuery";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/useLocalStorage" element={<LocalStorage />} />
        <Route path="/useMediaQuery" element={<MediaQuery />} />
        <Route path="/useDebounce" element={<p>use debounce</p>} />
        <Route path="/useFetch" element={<p>use fetch</p>} />
        <Route path="/useToggle" element={<p>use toggle</p>} />
      </Routes>
    </BrowserRouter>
  );
};

const Home = () => {
  return (
    <>
      <h1>Hom page</h1>
      <ol>
        <li>
          <Link to={"/useLocalStorage"}>useLocalStorage</Link>
        </li>
        <li>
          {" "}
          <Link to={"/useMediaQuery"}>useMediaQuery</Link>
        </li>
        <li>
          {" "}
          <Link to={"/useDebounce"}>useDebounce</Link>
        </li>
        <li>
          {" "}
          <Link to={"/useFetch"}>useFetch</Link>
        </li>
        <li>
          {" "}
          <Link to={"/useToggle"}>useToggle</Link>
        </li>
      </ol>
    </>
  );
};

const LocalStorage = () => {
  const [name, setName] = useLocalStorage("name", "John doe");

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Hello, {name}</p>
    </div>
  );
};

const MediaQuery = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? (
    <h1>This is mobile query</h1>
  ) : (
    <h1>This is desktop query</h1>
  );
};

export default App;
