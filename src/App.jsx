import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Insurance from "./pages/Insurance";
import InsuranceDetail from "./pages/InsuranceDetail";
import InsuranceForm from "./pages/InsuranceForm";
import Maintenance from "./pages/Maintenance"
import MaintenanceForm from "./pages/MaintenanceForm";
import MaintenanceDetail from "./pages/MaintenanceDetail";
import Services from "./pages/Services";
import ServicesDetail from "./pages/ServicesDetail";
import ServicesForm from "./pages/ServicesForm";

export default function App() {
  return (
    <Routes>
      {/* Rutas bajo el layout principal */}
      <Route
        path="/index.html"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/seguros"
        element={
          <MainLayout>
            <Insurance />
          </MainLayout>
        }
      />
      <Route
        path="/seguros/create"
        element={
          <MainLayout>
            <InsuranceForm />
          </MainLayout>
        }
      />
      <Route
        path="/seguros/:id"
        element={
          <MainLayout>
            <InsuranceDetail />
          </MainLayout>
        }
      />
       <Route
        path="/mantenimiento"
        element={
          <MainLayout>
            <Maintenance />
          </MainLayout>
        }
      />
      <Route
        path="/mantenimiento/create"
        element={
          <MainLayout>
            <MaintenanceForm />
          </MainLayout>
        }
      />
       <Route
        path="/mantenimiento/:id"
        element={
          <MainLayout>
            <MaintenanceDetail />
          </MainLayout>
        }
      />
      <Route
        path="/servicio"
        element={
          <MainLayout>
            <Services />
          </MainLayout>
        }
      />
      <Route
        path="/servicio/create"
        element={
          <MainLayout>
            <ServicesForm />
          </MainLayout>
        }
      />
      <Route
        path="/servicio/:id"
        element={
          <MainLayout>
            <ServicesDetail />
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
