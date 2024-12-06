import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import PaymentSuccess from "../components/payment/payment-success";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
export const Route = createFileRoute("/payment-success")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux

  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);
  return (
    <>
      <PaymentSuccess />
    </>
  );
}
