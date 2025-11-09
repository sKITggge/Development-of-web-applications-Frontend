import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '../../components/LoginForm'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Index />
}

function Index() {
  return (
    <div className="flex items-center justify-center">
      <LoginForm />
    </div>
  )
}
