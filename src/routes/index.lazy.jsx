import "../styles/global.css";

import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

import PromoHeader from "../components/PromoHeader/PromoHeader";
import { useSelector } from "react-redux";
export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <PromoHeader />
    </>
  );
}
