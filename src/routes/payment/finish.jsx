import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/payment/finish')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/payment/finish"!</div>
}
