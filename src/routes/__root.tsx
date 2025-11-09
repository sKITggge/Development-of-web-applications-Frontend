import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="pt-8 container mx-auto px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
