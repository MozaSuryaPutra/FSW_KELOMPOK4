import { createLazyFileRoute } from "@tanstack/react-router";
import ReturnFlight from "../components/ChooseFlight/ReturnFlight";
export const Route = createLazyFileRoute("/choose-return")({
  component: ChooseReturn,
});

function ChooseReturn() {
  return (
    <>
      <ReturnFlight />
    </>
  );
}
