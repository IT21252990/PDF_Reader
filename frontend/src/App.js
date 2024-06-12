import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import PDFViewer from "./pages/PDFViewer";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  const { user } = useAuthContext();

  return (
    <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/pdf/:id"
        element={user ? <PDFViewer /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
