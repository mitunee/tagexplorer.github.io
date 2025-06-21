import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'

export type Theme = 'light' | 'dark'

export const themeAtom = atomWithStorage<Theme>('theme', 'light')

export type ImageSize = 'small' | 'medium' | 'large' | 'huge'

export const imageSizeAtom = atomWithStorage<ImageSize>('imageSize', 'medium')

export type OnGenClick = 'CopyTag' | 'OpenImage' | 'OpenDanbooru'

export const onGenClickAtom = atomWithStorage<OnGenClick>('onGenClick', 'CopyTag')

export const favoritesAtom = atomWithStorage<string[]>('favorites', [])

export const favoritesOnlyAtom = atom(false)

export type IneffectiveTags = 'IneffectiveTagsHide' | 'IneffectiveTagsShow'

export const ineffectiveTagsAtom = atomWithStorage<IneffectiveTags>(
  'ineffectiveTags',
  'IneffectiveTagsHide',
)

export const collapsedGroupsAtom = atomWithStorage<string[]>('collapsedGroups', [])

export type ArtistOrder =
  | 'Alphabetical'
  | 'PostCount'
  | 'FaveCount'
  | 'Score'
  | 'AverageFaveCount'
  | 'AverageScore'
  | 'Random'

export const artistOrderAtom = atomWithStorage<ArtistOrder>('artistOrder', 'Alphabetical')

export const gensPerPageAtom = atomWithStorage<number>('gensPerPage', 50)

export const areSettingsCollapsed = atomWithStorage<boolean>('areSettingsCollapsed', false)
