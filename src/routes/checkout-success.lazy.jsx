import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/checkout-success')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/checkout-success"!</div>
}
