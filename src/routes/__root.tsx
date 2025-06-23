import { HeadContent, createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Sun, Moon } from 'lucide-react'
import { themeAtom, type Theme } from '../globalState'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import '../styles/index.css'
import '../styles/normalize.css'

export const Route = createRootRoute({
  component: Menu,
  head: () => ({
    meta: [{ title: 'tagexplorer' }],
    links: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  }),
})

function Menu() {
  const [theme, setTheme] = useAtom<Theme>(themeAtom)
  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <HeadContent />
      <div data-theme={theme}>
        <div
          className="flex custom-shadow-sm bg w-full justify-center py-3 items-center px-2"
          style={{ borderBottom: 'var(--subtle-border)' }}
        >
          <div className="grow flex justify-center px-3">
            <div className="flex gap-5 justify-start items-center flex-wrap">
              <Link to="/" className="[&.active]:font-bold">
                Heads
              </Link>{' '}
              <Link to="/styles" className="[&.active]:font-bold">
                Styles
              </Link>{' '}
              <Link to="/composition" className="[&.active]:font-bold">
                Composition
              </Link>{' '}
              <Link to="/postures" className="[&.active]:font-bold">
                Postures
              </Link>{' '}
              <Link to="/gestures" className="[&.active]:font-bold">
                Gestures
              </Link>{' '}
              <Link to="/artists" className="[&.active]:font-bold">
                Artists
              </Link>
              <Link to="/help" className="[&.active]:font-bold">
                Help
              </Link>
            </div>
          </div>
          <div className="px-4 flex items-center">
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
    </>
  )
}
