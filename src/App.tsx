import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Room } from "./pages";
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
            <Route path="/room/:id" element={<Room />} />
          </Routes>
        </SocketContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
