import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { SocketContextProvider } from "./context/SocketContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketContextProvider>
          <Link to="/">
            <h1>Skull & Roses</h1>
          </Link>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </SocketContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
