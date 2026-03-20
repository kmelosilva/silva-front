import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";

import Login from "./pages/Login";
import Missions from "./pages/Missions";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas */}
          <Route
            path="/missions"
            element={
              <PrivateRoute>
                <Missions />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
