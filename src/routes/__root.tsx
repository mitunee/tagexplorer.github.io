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
        data-theme={theme}
        className="py-4 flex gap-5 w-full justify-center custom-shadow-sm relative bg"
        style={{ borderBottom: 'var(--subtle-border)' }}
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
        <div className="absolute right-[1em] top-1/2 -translate-y-1/2">
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer"
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
