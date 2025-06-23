import { createFileRoute } from '@tanstack/react-router'
import { TagGroupBlock } from '../components/TagGroupBlock'
import { Settings } from '../components/Settings'
import { gesturesTagGroups } from '../tagGroups'

export const Route = createFileRoute('/gestures')({
  component: Gestures,
  head: () => ({
    meta: [{ title: 'Gestures - tagexplorer' }],
  }),
})

function Gestures() {
  return (
    <div className="py-3 px-5 bg">
      <Settings collapsibleGroupSlugs={gesturesTagGroups.map((g) => g.slug)} route={Route} />
      <div>
        {gesturesTagGroups.map((tagGroup, i) => (
          <TagGroupBlock key={i} tagGroup={tagGroup} route={Route} />
        ))}
      </div>
    </div>
  )
}
