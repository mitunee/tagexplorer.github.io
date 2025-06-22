import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom, useAtomValue, useAtom } from 'jotai'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  onGenClickAtom,
  type OnGenClick,
  type IneffectiveTags,
  favoritesAtom,
  imageSizeAtom,
  ineffectiveTagsAtom,
  collapsedGroupsAtom,
  type ImageSize,
  favoritesOnlyAtom,
  artistOrderAtom,
  type ArtistOrder,
  gensPerPageAtom,
  areSettingsCollapsed,
} from './globalState'
import {
  type TagGroup,
  faceTagGroups,
  compositionTagGroups,
  styleTagGroups,
  defaultPrompt,
} from './tagGroups'
import Fuse from 'fuse.js'
import artistMetadata from './assets/artistTags100posts.json'
import Rand from 'rand-seed'
import ReactPaginate from 'react-paginate'

export const Gen = ({
  tag: tagUnchecked,
  slug,
  webp,
  portrait,
}: {
  tag: string
  slug: string
  webp?: boolean
  portrait?: boolean
}) => {
  const [justClicked, setJustClicked] = useState(false)
  const onGenClick = useAtomValue(onGenClickAtom)
  const isFail = tagUnchecked.startsWith('_fail_')
  const tag = isFail ? tagUnchecked.slice(6) : tagUnchecked === '_base' ? 'no tag' : tagUnchecked
  const failStyle = isFail ? { color: 'var(--fail)' } : {}
  const ext = webp ? '.webp' : '.png'
  const imgUrl = encodeURI(`/gens/${slug}/${tag.replace(/\//g, '%2F')}_00001_${ext}`)
  const handleClick = () => {
    switch (onGenClick) {
      case 'OpenImage':
        window.open(imgUrl, '_blank')
        break
      case 'CopyTag':
        setJustClicked(true)
        void navigator.clipboard.writeText(tag)
        setTimeout(() => {
          setJustClicked(false)
        }, 1000)
        break
      case 'OpenDanbooru': {
        const danbooruTag = tag.replace(/ /g, '_').replace(/\\/g, '')
        window.open(`https://danbooru.donmai.us/posts?tags=${danbooruTag}`, '_blank')
        break
      }
    }
  }
  const handleMiddleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.button === 1)) return
    if (onGenClick === 'OpenImage') {
      window.open(imgUrl, '_blank')
    }
    if (onGenClick === 'OpenDanbooru') {
      const danbooruTag = tag.replace(/ /g, '_').replace(/\\/g, '')
      window.open(`https://danbooru.donmai.us/posts?tags=${danbooruTag}`, '_blank')
    }
  }

  const [favorites, setFavorites] = useAtom(favoritesAtom)

  const imageAspectRatio = portrait ? 'aspect-[416/608]' : 'aspect-square'

  return (
    <div
      className={[
        'flex flex-col bg-white dark:bg-black rounded-lg overflow-hidden my-1 custom-shadow-sm cursor-pointer relative',
        'full-opacity-on-hover-parent',
      ].join(' ')}
      onClick={handleClick}
      onAuxClick={handleMiddleClick}
    >
      {tag !== 'no tag' && (
        <div className="absolute top-[0px] right-[8px] z-10 text-3xl">
          <button
            className="text-red-400 hover:text-red-500 cursor-pointer full-opacity-on-hover"
            style={{
              opacity: favorites.includes(tag) || isTouchDevice() ? 1 : 0,
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
      )}
      <div className="w-full">
        <img
          src={imgUrl}
          className={['w-full h-auto', imageAspectRatio].join(' ')}
          loading="lazy"
        />
      </div>
      <div
        className={[
          'py-1 px-2 whitespace-normal w-full font-mono',
          tag === 'no tag' ? 'italic' : '',
        ].join(' ')}
        style={{
          fontSize: '0.7rem',
          color: justClicked ? 'var(--subtle)' : 'unset',
          transitionProperty: 'opacity',
          transitionDuration: '0.2s',
          transitionDelay: justClicked ? '0.8s' : '0s',
          opacity: justClicked ? 0 : 1,

          ...failStyle,
        }}
      >
        {justClicked ? 'Copied to clipboard.' : tag}
      </div>
    </div>
  )
}

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
}

export const Pill = ({ label: tag, ...props }: PillProps) => {
  return (
    <div
      {...props}
      className={[
        'bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200 rounded-full px-3 py-1 text-sm font-semibold text-nowrap',
        props.className,
      ].join(' ')}
    >
      {tag}
    </div>
  )
}

export interface SearchParams {
  tagGroupFilter?: string
  tagFilter?: string
  randomSeed?: string
  page?: number
}

interface AnyRoute {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fullPath: any
  useSearch: () => SearchParams
}

export const Settings = (props: {
  mode: 'Heads' | 'Styles' | 'Composition' | 'Artists'
  route: AnyRoute
}) => {
  const [imageSize, setImageSize] = useAtom(imageSizeAtom)
  const [onGenClick, setOnGenClick] = useAtom(onGenClickAtom)
  const [ineffectiveTags, setIneffectiveTags] = useAtom(ineffectiveTagsAtom)
  const [artistOrder, setArtistOrder] = useAtom(artistOrderAtom)
  const setCollapsedGroups = useSetAtom(collapsedGroupsAtom)
  const allSlugs =
    props.mode === 'Heads'
      ? faceTagGroups.map((tagGroup) => tagGroup.slug)
      : props.mode === 'Styles'
        ? styleTagGroups.map((tagGroup) => tagGroup.slug)
        : props.mode === 'Composition'
          ? compositionTagGroups.map((tagGroup) => tagGroup.slug)
          : []
  const collapseAll = () => setCollapsedGroups(allSlugs)
  const expandAll = () => setCollapsedGroups([])
  // eslint-disable-next-line
  const navigate = useNavigate({ from: props.route.fullPath })
  const searchParams: SearchParams = props.route.useSearch()
  const resetSearchParams = useCallback(() => {
    if (props.mode !== 'Artists') {
      if (artistOrder === 'Random') {
        setArtistOrder('Alphabetical')
      }
      // eslint-disable-next-line
      void navigate({ search: { ...searchParams, randomSeed: undefined, page: undefined } } as any)
    } else if (searchParams.randomSeed && artistOrder !== 'Random') {
      setArtistOrder('Random')
    }
  }, [props.mode, searchParams, navigate, artistOrder, setArtistOrder])
  useEffect(() => {
    resetSearchParams()
  }, [resetSearchParams])
  const [favoritesOnly, setFavoritesOnly] = useAtom(favoritesOnlyAtom)
  const toggleFavoritesOnly = () => setFavoritesOnly((prev) => !prev)
  const [gensPerPage, setGensPerPage] = useAtom(gensPerPageAtom)
  const [isCollapsed, setIsCollapsed] = useAtom(areSettingsCollapsed)
  const toggleCollapseIcon = isCollapsed ? <ChevronDown size={32} /> : <ChevronUp size={32} />
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev)
  }

  return (
    <div className="subtle-bg my-5 py-5 px-4 rounded-lg custom-shadow-md flex flex-col gap-3 text-sm">
      <div className="text-lg flex items-center gap-2 cursor-pointer" onClick={toggleCollapse}>
        {toggleCollapseIcon} Settings
      </div>
      <div
        className="flex flex-col gap-3"
        style={{
          display: isCollapsed ? 'none' : 'flex',
        }}
      >
        <div className="flex gap-5 pb-4 flex-col" style={{ borderBottom: 'var(--subtle-border)' }}>
          <div className="flex gap-6 gap-y-1 items-center flex-wrap">
            <div className="flex items-start flex-wrap flex-col">
              <label htmlFor="imageSize" className="font-semibold">
                Image size
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
            <div className="flex items-start flex-wrap flex-col">
              <label htmlFor="onGenClick" className="font-semibold">
                On click
              </label>
              <select
                id="onGenClick"
                value={onGenClick}
                onChange={(e) => setOnGenClick(e.target.value as OnGenClick)}
                className="rounded px-2 dark:bg-neutral-700 dark:text-neutral-200"
                style={{ border: 'var(--subtle-border)' }}
              >
                <option value="CopyTag">Copy tag</option>
                <option value="OpenImage">Open image</option>
                <option value="OpenDanbooru">Danbooru search</option>
              </select>
            </div>
            {props.mode !== 'Artists' && (
              <div className="flex items-start flex-wrap flex-col">
                <label htmlFor="ineffectiveTags" className="font-semibold">
                  Ineffective tags
                </label>
                <select
                  id="ineffectiveTags"
                  value={ineffectiveTags}
                  onChange={(e) => setIneffectiveTags(e.target.value as IneffectiveTags)}
                  className="rounded px-2 dark:bg-neutral-700 dark:text-neutral-200"
                  style={{ border: 'var(--subtle-border)' }}
                >
                  <option value="IneffectiveTagsHide">Hide</option>
                  <option value="IneffectiveTagsShow">Show</option>
                </select>
              </div>
            )}
            {props.mode === 'Artists' && (
              <div className="flex items-start flex-wrap flex-col">
                <label htmlFor="artistOrder" className="font-semibold">
                  Artist order
                </label>
                <select
                  id="artistOrder"
                  value={artistOrder}
                  onChange={(e) => {
                    const newVal = e.target.value as ArtistOrder
                    const randomNumber = Math.floor(Math.random() * 99999999) + 1
                    // eslint-disable-next-line
                    void navigate({
                      search: {
                        ...searchParams,
                        randomSeed: newVal === 'Random' ? randomNumber : undefined,
                        page: 1,
                      },
                      // eslint-disable-next-line
                    } as any).then(() => {
                      setArtistOrder(newVal)
                    })
                  }}
                  className="rounded px-2 dark:bg-neutral-700 dark:text-neutral-200"
                  style={{ border: 'var(--subtle-border)' }}
                >
                  <option value="Alphabetical">Alphabetical</option>
                  <option value="PostCount">Post count</option>
                  <option value="FaveCount">Favorites</option>
                  <option value="Score">Score</option>
                  <option value="AverageFaveCount">Average favorites</option>
                  <option value="AverageScore">Average score</option>
                  <option value="Random">Random</option>
                </select>
              </div>
            )}
            {props.mode === 'Artists' && (
              <div className="flex items-start flex-wrap flex-col">
                <label htmlFor="gensPerPage" className="font-semibold">
                  Images per page
                </label>
                <select
                  id="gensPerPage"
                  value={gensPerPage}
                  onChange={(e) => {
                    const newVal = Number(e.target.value)
                    setGensPerPage(newVal)
                  }}
                  className="rounded px-2 dark:bg-neutral-700 dark:text-neutral-200"
                  style={{ border: 'var(--subtle-border)' }}
                >
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            {props.mode !== 'Artists' && (
              <>
                <Pill
                  label="Collapse all"
                  className="cursor-pointer text-nowrap"
                  onClick={collapseAll}
                />
                <Pill
                  label="Expand all"
                  className="cursor-pointer text-nowrap"
                  onClick={expandAll}
                />
              </>
            )}
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
        {props.mode !== 'Artists' && (
          <div className="flex flex-col ">
            <label htmlFor="filterTagGroups" className="text-xs">
              Search tag groups:
            </label>
            <div className="flex gap-2 items-center">
              <input
                id="filterTagGroups"
                type="text"
                className="rounded py-[1px] px-2 w-full max-w-[200px] mt-1"
                style={{ border: 'var(--subtle-border)', fontSize: '0.75rem' }}
                value={searchParams.tagGroupFilter ?? ''}
                onChange={(e) => {
                  const newVal = e.target.value.toLowerCase()
                  // eslint-disable-next-line
                  void navigate({ search: { ...searchParams, tagGroupFilter: newVal } } as any)
                }}
              />
              <Pill
                label="Clear"
                className="cursor-pointer text-xs px-1 py-[3px]"
                onClick={() =>
                  // eslint-disable-next-line
                  void navigate({ search: { ...searchParams, tagGroupFilter: undefined } } as any)
                }
              />
            </div>
          </div>
        )}
        <div className="flex flex-col ">
          <label htmlFor="filterTags" className="text-xs">
            Search tags:
          </label>
          <div className="flex gap-2 items-center">
            <input
              id="filterTags"
              type="text"
              className="rounded py-[1px] px-2 w-full max-w-[200px] mt-1"
              style={{ border: 'var(--subtle-border)', fontSize: '0.75rem' }}
              value={searchParams.tagFilter ?? ''}
              onChange={(e) => {
                const newVal = e.target.value.toLowerCase()
                // eslint-disable-next-line
                void navigate({ search: { ...searchParams, tagFilter: newVal } } as any)
              }}
            />
            <Pill
              label="Clear"
              className="cursor-pointer text-xs px-1 py-[3px]"
              onClick={() =>
                // eslint-disable-next-line
                void navigate({ search: { ...searchParams, tagFilter: undefined } } as any)
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const TagGroupBlock = ({
  tagGroup,
  route,
  webp,
  artists,
  portrait,
}: {
  tagGroup: TagGroup
  route: AnyRoute
  webp?: boolean
  artists?: boolean
  portrait?: boolean
}) => {
  const { slug, wikiPage, prompt, tags, fails } = tagGroup
  const searchParams: SearchParams = route.useSearch()
  const tagGroupFilter = searchParams.tagGroupFilter?.replace(/\s+/g, '_') ?? ''
  const tagFilter = searchParams.tagFilter ?? ''
  const fuseOptions = useMemo(
    () => ({ ignoreLocation: true, threshold: 0.3, keys: [], findAllMatches: true }),
    [],
  )
  const tagGroupFuse = useMemo(() => new Fuse([slug], fuseOptions), [fuseOptions, slug])
  const ineffectiveTags = useAtomValue(ineffectiveTagsAtom)
  const favoritesOnly = useAtomValue(favoritesOnlyAtom)
  const tagsWithIneffective = useMemo(
    () => [
      ...tags,
      ...(ineffectiveTags === 'IneffectiveTagsShow' || favoritesOnly
        ? (fails ?? []).map((t) => `_fail_${t}`)
        : []),
    ],
    [tags, fails, ineffectiveTags, favoritesOnly],
  )
  const tagFuse = useMemo(
    () =>
      new Fuse(
        tagsWithIneffective.map((t) => t.replace(/_fail_/g, '')),
        fuseOptions,
      ),
    [fuseOptions, tagsWithIneffective],
  )
  const slugIsMatched = tagGroupFuse.search(tagGroupFilter).length > 0
  const matchedTags = tagFuse.search(tagFilter).map((result) => result.item)
  const favorites = useAtomValue(favoritesAtom)
  const artistOrder = useAtomValue(artistOrderAtom)
  const tagsToShowWithoutBase = (tagFilter.trim() !== '' ? matchedTags : tagsWithIneffective)
    .filter((tag) => !favoritesOnly || favorites.includes(tag.replace(/_fail_/g, '')))
    .sort((a, b) => {
      const cleanA = a.replace(/_fail_/g, '')
      const cleanB = b.replace(/_fail_/g, '')
      type ArtistMetadata = Record<string, { postCount: number; faveCount: number; score: number }>
      const metadata: ArtistMetadata = artistMetadata
      if (!artists || artistOrder === 'Alphabetical') {
        return cleanA.localeCompare(cleanB)
      }
      if (artistOrder === 'PostCount') {
        const aCount = metadata[cleanA]?.postCount ?? 0
        const bCount = metadata[cleanB]?.postCount ?? 0
        return bCount - aCount
      }
      if (artistOrder === 'FaveCount') {
        const aCount = metadata[cleanA]?.faveCount ?? 0
        const bCount = metadata[cleanB]?.faveCount ?? 0
        return bCount - aCount
      }
      if (artistOrder === 'Score') {
        const aScore = metadata[cleanA]?.score ?? 0
        const bScore = metadata[cleanB]?.score ?? 0
        return bScore - aScore
      }
      if (artistOrder === 'AverageFaveCount') {
        const aCount = metadata[cleanA]?.faveCount ?? 0
        const bCount = metadata[cleanB]?.faveCount ?? 0
        const aPosts = metadata[cleanA]?.postCount || 1
        const bPosts = metadata[cleanB]?.postCount || 1
        return bCount / bPosts - aCount / aPosts
      }
      if (artistOrder === 'AverageScore') {
        const aScore = metadata[cleanA]?.score ?? 0
        const bScore = metadata[cleanB]?.score ?? 0
        const aPosts = metadata[cleanA]?.postCount || 1
        const bPosts = metadata[cleanB]?.postCount || 1
        return bScore / bPosts - aScore / aPosts
      }
      if (artistOrder === 'Random') {
        const seed = searchParams.randomSeed ?? ''
        const rand = new Rand(seed + cleanA + cleanB)
        const randA = rand.next()
        const randB = rand.next()
        return randB - randA
      }
      return cleanA.localeCompare(cleanB)
    })
  // eslint-disable-next-line
  const navigate = useNavigate({ from: route.fullPath })
  const page = useMemo(() => searchParams.page ?? 1, [searchParams.page])
  const setPage = (page: number) => {
    // eslint-disable-next-line
    void navigate({ search: { ...searchParams, page } } as any)
  }
  const gensPerPage = useAtomValue(gensPerPageAtom)
  const pages = chunkArray(tagsToShowWithoutBase, gensPerPage)
  const pageToShow = artists ? (pages[page - 1] ?? pages[0]) : tagsToShowWithoutBase
  const tagsToShow =
    pageToShow.length > 0 ? (favoritesOnly ? pageToShow : ['_base', ...pageToShow]) : []

  const isFilteredByTagGroup = tagGroupFilter.trim() !== '' && !slugIsMatched
  const isFilteredByTag = tagsToShow.length === 0
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
    medium: 175,
    large: 275,
    huge: 475,
  }

  return (
    <div
      className="strong-bg my-5 pb-5 pt-2 px-4 rounded-lg custom-shadow-md flex flex-col gap-3 relative"
      style={{
        display: isFiltered ? 'none' : 'flex',
      }}
    >
      <div className="flex justify-between items-center flex-wrap">
        <div
          className="flex justify-between items-center flex-wrap grow cursor-pointer"
          onClick={artists ? () => {} : toggleCollapse}
        >
          <div className="font-semibold flex gap-2 items-center ">
            {artists ? <></> : toggleCollapseIcon} {slug.replace(/_/g, ' ')}
          </div>
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
            <div className="w-full flex justify-end whitespace-pre-wrap">
              <div
                className="text-gray-700 dark:text-neutral-300 font-mono max-w-[400px]"
                style={{ fontSize: '0.7rem', textAlign: 'right' }}
              >
                {prompt ?? defaultPrompt} {artists ? 'TAG' : '(TAG:1.1)'}
              </div>
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
          {artists && <PageSelector page={page} maxPage={pages.length} onSubmit={setPage} />}
          <div
            className="grid w-full px-1"
            style={{
              gridTemplateColumns: `repeat(auto-fill, minmax(${minWidths[imageSize]}px, 1fr))`,
              gap: '8px',
            }}
          >
            {tagsToShow.map((tag, i) => (
              <Gen key={i + tag} tag={tag} slug={slug} webp={webp} portrait={portrait} />
            ))}
          </div>
          {artists && <PageSelector page={page} maxPage={pages.length} onSubmit={setPage} />}
        </div>
      </div>
    </div>
  )
}

const isTouchDevice = () =>
  window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  arr.length > 0 ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)] : []

const PageSelector = (props: {
  page: number
  maxPage: number
  onSubmit: (newPage: number) => void
}) => {
  return (
    <ReactPaginate
      nextLabel=">"
      onPageChange={({ selected }) => {
        props.onSubmit(selected + 1)
      }}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={props.maxPage}
      forcePage={props.page - 1}
      previousLabel="<"
      pageClassName=""
      pageLinkClassName="px-1 py-1 page-link "
      previousClassName=""
      previousLinkClassName="subtle-border"
      nextClassName=""
      nextLinkClassName="subtle-border"
      breakLabel="…"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="flex gap-1 font-mono cursor-pointer text-xs flex justify-center items-center my-3 select-none"
      activeClassName="font-bold underline"
      renderOnZeroPageCount={null}
    />
  )
}
