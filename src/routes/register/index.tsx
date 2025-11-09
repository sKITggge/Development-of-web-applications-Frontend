import { createFileRoute } from '@tanstack/react-router'
import RegisterForm from '../../components/RegisterForm'

export const Route = createFileRoute('/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Index />
}

function Index() {
  return (
    <div className="flex items-center justify-center">
      <RegisterForm />
    </div>
  )
}
