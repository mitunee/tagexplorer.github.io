import { createFileRoute, useNavigate } from '@tanstack/react-router'
import '../index.css'
import '../normalize.css'
import { type TagGroup, allTagGroups, defaultPrompt } from '../tagGroups'
import { useMemo, useState } from 'react'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Fuse from 'fuse.js'

export const Route = createFileRoute('/')({
  component: Index,
})

interface SearchParams {
  tagGroupFilter?: string
  tagFilter?: string
}

function Index() {
  // const searchParams: SearchParams = Route.useSearch()
  // const activeTagGroup = searchParams.tagGroup
  return (
    <div className="py-3 px-5 bg">
      <Settings />
      <div>
        {allTagGroups.map((tagGroup, i) => (
          <TagGroupBlock key={i} tagGroup={tagGroup} topLevel />
        ))}
      </div>
    </div>
  )
}

const topLevelSlugs = allTagGroups.map((tagGroup) => tagGroup.slug)

const collapsedGroupsAtom = atomWithStorage<string[]>('collapsedGroups', [])

type ImageSize = 'small' | 'medium' | 'large' | 'huge'

const imageSizeAtom = atomWithStorage<ImageSize>('imageSize', 'medium')

const favoritesAtom = atomWithStorage<string[]>('favorites', [])

const favoritesOnlyAtom = atom(false)

const Settings = () => {
  const [imageSize, setImageSize] = useAtom(imageSizeAtom)
  const setCollapsedGroups = useSetAtom(collapsedGroupsAtom)
  const collapseAll = () => setCollapsedGroups(topLevelSlugs)
  const expandAll = () => setCollapsedGroups([])
  const navigate = useNavigate({ from: Route.fullPath })
  const searchParams: SearchParams = Route.useSearch()
  const [favoritesOnly, setFavoritesOnly] = useAtom(favoritesOnlyAtom)
  const toggleFavoritesOnly = () => setFavoritesOnly((prev) => !prev)

  return (
    <div className="subtle-bg my-5 py-5 px-4 rounded-lg custom-shadow-md flex flex-col gap-3 text-sm">
      <div
        className="flex gap-3 items-center pb-4 flex-wrap"
        style={{ borderBottom: 'var(--subtle-border)' }}
      >
        <div className="flex gap-2 items-center flex-wrap">
          <label htmlFor="imageSize" className="font-semibold">
            Image size:
          </label>
          <select
            id="imageSize"
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value as ImageSize)}
            className="rounded px-2 dark:bg-neutral-700 dark:text-neutral-200"
            style={{ border: 'var(--subtle-border)' }}
          >
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
            <option value="huge">huge</option>
          </select>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Pill label="Collapse all" className="cursor-pointer text-nowrap" onClick={collapseAll} />
          <Pill label="Expand all" className="cursor-pointer text-nowrap" onClick={expandAll} />
          <Pill
            label="Favorites only"
            className={['cursor-pointer', favoritesOnly ? 'bg-red-200 dark:bg-red-900' : ''].join(
              ' ',
            )}
            onClick={toggleFavoritesOnly}
          />
        </div>
      </div>
      <div className="text-xs">
        Search queries are stored in the URL, so you can bookmark or share them.
      </div>
      <div className="flex flex-col ">
        <label htmlFor="filterTagGroups" className="text-xs">
          Search tag groups:
        </label>
        <div className="flex gap-2 items-center">
          <input
            id="filterTagGroups"
            type="text"
            className="rounded py-[1px] px-2 w-[200px] mt-1"
            style={{ border: 'var(--subtle-border)', fontSize: '0.75rem' }}
            value={searchParams.tagGroupFilter ?? ''}
            onChange={(e) => {
              const newVal = e.target.value.toLowerCase()
              void navigate({ search: { ...searchParams, tagGroupFilter: newVal } })
            }}
          />
          <Pill
            label="Clear"
            className="cursor-pointer text-xs px-1 py-[3px]"
            onClick={() =>
              void navigate({ search: { ...searchParams, tagGroupFilter: undefined } })
            }
          />
        </div>
      </div>
      <div className="flex flex-col ">
        <label htmlFor="filterTags" className="text-xs">
          Search tags:
        </label>
        <div className="flex gap-2 items-center">
          <input
            id="filterTags"
            type="text"
            className="rounded py-[1px] px-2 w-[200px] mt-1"
            style={{ border: 'var(--subtle-border)', fontSize: '0.75rem' }}
            value={searchParams.tagFilter ?? ''}
            onChange={(e) => {
              const newVal = e.target.value.toLowerCase()
              void navigate({ search: { ...searchParams, tagFilter: newVal } })
            }}
          />
          <Pill
            label="Clear"
            className="cursor-pointer text-xs px-1 py-[3px]"
            onClick={() => void navigate({ search: { ...searchParams, tagFilter: undefined } })}
          />
        </div>
      </div>
    </div>
  )
}

const TagGroupBlock = ({ tagGroup, topLevel }: { tagGroup: TagGroup; topLevel?: boolean }) => {
  const { slug, wikiPage, prompt, portrait, tags, subGroups } = tagGroup
  const searchParams: SearchParams = Route.useSearch()
  const tagGroupFilter = searchParams.tagGroupFilter?.replace(/\s+/g, '_') ?? ''
  const tagFilter = searchParams.tagFilter ?? ''
  const fuseOptions = useMemo(
    () => ({ ignoreLocation: true, threshold: 0.3, keys: [], findAllMatches: true }),
    [],
  )
  const tagGroupFuse = useMemo(() => new Fuse([slug], fuseOptions), [fuseOptions, slug])
  const tagFuse = useMemo(() => new Fuse(tags, fuseOptions), [fuseOptions, tags])
  const slugIsMatched = tagGroupFuse.search(tagGroupFilter).length > 0
  const matchedTags = tagFuse.search(tagFilter).map((result) => result.item)

  const favoritesOnly = useAtomValue(favoritesOnlyAtom)
  const favorites = useAtomValue(favoritesAtom)
  const effectiveTags = (tagFilter.trim() !== '' ? matchedTags : tags).filter(
    (tag) => !favoritesOnly || favorites.includes(tag),
  )

  const isFilteredByTagGroup = tagGroupFilter.trim() !== '' && !slugIsMatched
  const isFilteredByTag = effectiveTags.length === 0
  const isFiltered = isFilteredByTagGroup || isFilteredByTag

  const collapsedGroups = useAtomValue(collapsedGroupsAtom)
  const isCollapsed = collapsedGroups.includes(slug) && tagFilter.trim() === ''

  const setCollapsedGroups = useSetAtom(collapsedGroupsAtom)
  const toggleCollapseIcon = isCollapsed ? <ChevronDown size={32} /> : <ChevronUp size={32} />
  const toggleCollapse = () => {
    setCollapsedGroups((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug)
      } else {
        return [...prev, slug]
      }
    })
  }
  const [showPrompt, setShowPrompt] = useState(false)

  const imageSize = useAtomValue(imageSizeAtom)
  const minWidths = {
    small: 125,
    medium: 200,
    large: 300,
    huge: 500,
  }

  return (
    <div
      className="strong-bg my-5 pb-5 pt-2 px-4 rounded-lg custom-shadow-md flex flex-col gap-3 relative"
      style={{
        display: isFiltered ? 'none' : 'flex',
      }}
    >
      <div className="flex justify-between items-center">
        <div
          className="font-semibold flex gap-2 items-center cursor-pointer"
          onClick={toggleCollapse}
        >
          {toggleCollapseIcon} {slug.replace(/_/g, ' ')}
        </div>
        <div className="flex gap-2 items-center ">
          <Pill
            label={showPrompt ? 'hide prompt' : 'show prompt'}
            className="cursor-pointer text-xs"
            onClick={() => {
              setShowPrompt((prev) => !prev)
            }}
          />
          {wikiPage && (
            <a href={wikiPage} target="_blank" rel="noopener noreferrer">
              <Pill label="wiki" className="cursor-pointer text-xs" />
            </a>
          )}
        </div>
      </div>
      <div
        className="flex items-start gap-2 flex-wrap relative"
        style={{
          height: isCollapsed ? '100px' : 'unset',
          transition: 'height 0.3s ease-in-out',
          overflow: 'hidden',
        }}
      >
        <div className="flex flex-col gap-2 w-full">
          {showPrompt && (
            <div className="text-xs text-gray-700 dark:text-neutral-300">
              {prompt ?? defaultPrompt} {'{{tag}}'}
            </div>
          )}
          {isCollapsed && (
            <div
              className="w-full bottom-0 bg-gray-100 dark:bg-[#282828] h-[5px] absolute z-10"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black)',
              }}
            ></div>
          )}
          <div
            className="grid w-full"
            style={{
              gridTemplateColumns: `repeat(auto-fill, minmax(${minWidths[imageSize]}px, 1fr))`,
              gap: '8px',
            }}
          >
            {effectiveTags.map((tag, i) => (
              <Gen key={i} tag={tag} slug={slug} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Gen = ({ tag, slug }: { tag: string; slug: string }) => {
  const [justClicked, setJustClicked] = useState(false)
  const handleClick = () => {
    setJustClicked(true)
    void navigator.clipboard.writeText(tag)
    setTimeout(() => {
      setJustClicked(false)
    }, 1000)
  }

  const [favorites, setFavorites] = useAtom(favoritesAtom)

  return (
    <div
      className={[
        'flex flex-col bg-white dark:bg-black rounded-lg overflow-hidden my-1 custom-shadow-sm cursor-pointer relative',
        'full-opacity-on-hover-parent',
      ].join(' ')}
      onClick={handleClick}
    >
      <div className="absolute top-[-4px] right-[4px] z-10 text-3xl">
        <button
          className="text-red-400 hover:text-red-500 cursor-pointer full-opacity-on-hover"
          style={{
            opacity: favorites.includes(tag) ? 1 : 0,
            textShadow: '0 0 3px rgba(0, 0, 0, 1)',
          }}
          onClick={(e) => {
            e.stopPropagation()
            setFavorites((prev) =>
              prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
            )
          }}
        >
          {favorites.includes(tag) ? '♥' : '♡'}
        </button>
      </div>
      <div className="w-full">
        <img src={encodeURI(`/gens/${slug}/${tag}_00001_.png`)} className="w-full h-auto" />
      </div>
      <div
        className={['py-1 px-2 whitespace-normal w-full font-mono'].join(' ')}
        style={{
          fontSize: '0.7rem',
          color: justClicked ? 'var(--subtle)' : 'unset',
          transitionProperty: 'opacity',
          transitionDuration: '0.2s',
          transitionDelay: justClicked ? '0.8s' : '0s',
          opacity: justClicked ? 0 : 1,
        }}
      >
        {justClicked ? 'Copied to clipboard.' : tag}
      </div>
    </div>
  )
}

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
}

const Pill = ({ label: tag, ...props }: PillProps) => {
  return (
    <div
      {...props}
      className={[
        'bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200 rounded-full px-3 py-1 text-sm font-semibold',
        props.className,
      ].join(' ')}
    >
      {tag}
    </div>
  )
}
