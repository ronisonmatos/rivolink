import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import TodoList from "../components/todolist/Index"
import UserCrud from "../components/user/UserCrud";
import NotFound from "../components/home/Home"; // Página de rota não encontrada

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UserCrud />} />
      <Route path="/todolist" element={<TodoList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
