/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useFetch } from "./hooks/useFetch";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/useLocalStorage" element={<LocalStorage />} />
        <Route path="/useMediaQuery" element={<MediaQuery />} />
        <Route path="/useDebounce" element={<Debounce />} />
        <Route path="/useFetch" element={<Fetch />} />
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

const Debounce = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const debounceSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debounceSearchTerm) {
      fetch(`https://restcountries.com/v3.1/name/${debounceSearchTerm}`)
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [debounceSearchTerm]);

  return (
    <div>
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
      {data.length > 0 &&
        data.map((val) => (
          <ul>
            <li>{val?.name?.common}</li>
          </ul>
        ))}
    </div>
  );
};

const Fetch = () => {
  const { data, error, loading } = useFetch(
    "https://restcountries.com/v3.1/independent?status=true"
  );

  if (loading) return <p>loading</p>;
  if (error) return <p>Something went wrong</p>;
  return (
    <div>
      <ul>
        {(data || [])?.map((x: any) => (
          <li>{x.name.common}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
