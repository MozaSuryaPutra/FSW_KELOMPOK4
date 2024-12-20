import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/payment/finish")({
  component: RouteComponent,
});

// Route Component
function RouteComponent() {
  const { transaction_status, order_id, status_code } = useSearch(); // Ambil query params

  const renderContent = () => {
    switch (transaction_status) {
      case "settlement":
        return (
          <div>
            <h1>Pembayaran Berhasil!</h1>
            <p>Order ID: {order_id}</p>
            <p>Status Code: {status_code}</p>
          </div>
        );
      case "pending":
        return <h1>Pembayaran Masih Pending. Harap Tunggu!</h1>;
      case "cancel":
        return <h1>Pembayaran Dibatalkan!</h1>;
      default:
        return <h1>Status Pembayaran Tidak Diketahui!</h1>;
    }
  };

  return (
    <div>
      <h1>Payment Finish</h1>
      {renderContent()}
    </div>
  );
}
