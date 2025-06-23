import { createFileRoute } from '@tanstack/react-router'
import { TagGroupBlock } from '../components/TagGroupBlock'
import { Settings } from '../components/Settings'
import { postureTagGroups } from '../tagGroups'

export const Route = createFileRoute('/postures')({
  component: Postures,
  head: () => ({
    meta: [{ title: 'Postures - tagexplorer' }],
  }),
})

function Postures() {
  return (
    <div className="py-3 px-5 bg">
      <Settings collapsibleGroupSlugs={postureTagGroups.map((g) => g.slug)} route={Route} />
      <div>
        {postureTagGroups.map((tagGroup, i) => (
          <TagGroupBlock key={i} tagGroup={tagGroup} route={Route} />
        ))}
      </div>
    </div>
  )
}
