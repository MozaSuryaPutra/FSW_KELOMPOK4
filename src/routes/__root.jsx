import React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";
import NavBar from "../components/Navbar/NavBar";
import { useLocation } from "@tanstack/react-router";
export const Route = createRootRoute({
  component: () => {
    // Cek apakah path dimulai dengan '/auth' untuk menentukan apakah NavBar ditampilkan
    const location = useLocation();
    const isAuthRoute = location.pathname.startsWith("/auth");

    return (
      <>
        {!isAuthRoute && <NavBar />}{" "}
        {/* Tampilkan NavBar jika bukan route '/auth' */}
        <Outlet />
        {/* Debugging tool for router */}
        <TanStackRouterDevtools />
        <ToastContainer theme="colored" />
      </>
    );
  },
});
