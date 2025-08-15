import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      {/* Rutas bajo el layout principal */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />
      {/* Ruta de login sin layout (ejemplo) */}
      <Route path="/login" element={<Login />} />
      {/* 404 opcional */}
      <Route
        path="*"
        element={
          <MainLayout>
            <div>Página no encontrada</div>
          </MainLayout>
        }
      />
    </Routes>
  );
}
