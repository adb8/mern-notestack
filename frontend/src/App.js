import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import SearchPage from "./components/pages/SearchPage";
import StackPage from "./components/pages/StackPage";
import PrivateRoutes from "./components/elements/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/stack" element={<StackPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
