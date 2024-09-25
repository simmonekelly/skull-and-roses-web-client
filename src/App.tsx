import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Room } from "./pages";
import { SocketContextProvider } from "./context/SocketContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketContextProvider>
          <Routes>
            <Route path="/skull-and-roses-web-client" element={<Home />} />
            <Route path="/room/:id" element={<Room />} />
          </Routes>
        </SocketContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
