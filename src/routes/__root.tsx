import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div
        className="py-4 flex gap-5 w-full justify-center shadow-sm"
        style={{ borderBottom: '1px solid #ccc' }}
      >
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/artists" className="[&.active]:font-bold">
          Artists
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
