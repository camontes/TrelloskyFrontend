import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SideBarPage from "./pages/SideBarPage";
import "./App.css"


const App: React.FC = () => {
  return (
    <Router>
      <SideBarPage />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Agrega más rutas aquí en el futuro */}
      </Routes>
    </Router>
  );
};

export default App;