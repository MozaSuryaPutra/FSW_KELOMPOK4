import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import PaymentSuccess from "../components/payment/payment-success";

export const Route = createFileRoute("/payment-success")({
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <>
      <PaymentSuccess />
    </>
  );
}
