import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Missions from "./pages/Missions";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/missions" element={<Missions />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
