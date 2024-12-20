import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import PaymentSuccess from "../components/payment/paymentsuccess";

export const Route = createLazyFileRoute("/payment-finish")({
  component: Paymentfinish,
});

function Paymentfinish() {
  return (
    <>
      <PaymentSuccess />
    </>
  );
}
