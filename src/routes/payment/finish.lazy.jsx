import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/payment/finish')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/payment/finish"!</div>
}
