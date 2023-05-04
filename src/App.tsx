import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { SocketContextProvider } from "./context/SocketContext";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </SocketContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
