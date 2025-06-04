import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Room } from "./pages";
import { DatabaseContextProvider } from "./context/DatabaseContext";

function App() {
  const roomPath = (id: string = `:id`) => `room/${id}`;

  return (
    <div className="App">
      <BrowserRouter>
        <DatabaseContextProvider>
          <Routes>
            <Route path="/skull-and-roses-web-client" element={<Home />} />
            <Route path={roomPath()} element={<Room />} />
          </Routes>
        </DatabaseContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
