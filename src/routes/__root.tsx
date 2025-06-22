import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Sun, Moon } from 'lucide-react'
import { themeAtom, type Theme } from '../globalState'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: Menu,
})

function Menu() {
  const [theme, setTheme] = useAtom<Theme>(themeAtom)
  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div data-theme={theme}>
      <div
        className="flex custom-shadow-sm bg w-full py-3 items-center"
        style={{ borderBottom: 'var(--subtle-border)' }}
      >
        <div className="flex grow gap-5 w-full justify-center items-center flex-wrap">
          <Link to="/" className="[&.active]:font-bold">
            Heads
          </Link>{' '}
          <Link to="/styles" className="[&.active]:font-bold">
            Styles
          </Link>{' '}
          <Link to="/composition" className="[&.active]:font-bold">
            Composition
          </Link>{' '}
          <Link to="/artists" className="[&.active]:font-bold">
            Artists
          </Link>
          <Link to="/help" className="[&.active]:font-bold">
            Help
          </Link>
        </div>
        <div className="px-3">
          <button
            className="rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
      <div className="bg" data-theme={theme}>
        <Outlet />
      </div>
    </div>
  )
}
