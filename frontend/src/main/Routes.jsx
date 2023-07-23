import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import AppointmentSchedule from "../components/schedule/AppointmentSchedule"
import UserCrud from "../components/user/UserCrud";
import NotFound from "../components/home/Home"; // Página de rota não encontrada

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UserCrud />} />
      <Route path="/schedule" element={<AppointmentSchedule />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
