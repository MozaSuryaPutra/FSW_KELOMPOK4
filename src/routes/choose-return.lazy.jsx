import { createLazyFileRoute } from "@tanstack/react-router";
import ReturnFlight from "../components/ChooseFlight/returnFlight";
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
