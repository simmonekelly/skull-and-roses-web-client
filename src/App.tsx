import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Room } from "./pages";
import { DatabaseContextProvider } from "./context/DatabaseContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DatabaseContextProvider>
          <Routes>
            <Route path="/skull-and-roses-web-client" element={<Home />} />
            <Route path="/room/:id" element={<Room />} />
          </Routes>
        </DatabaseContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
