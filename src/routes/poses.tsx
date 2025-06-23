import { createFileRoute } from '@tanstack/react-router'
import { TagGroupBlock } from '../components/TagGroupBlock'
import { Settings } from '../components/Settings'

export const Route = createFileRoute('/poses')({
  component: Poses,
  head: () => ({
    meta: [{ title: 'Poses - tagexplorer' }],
  }),
})

function Poses() {
  return (
    <div className="py-3 px-5 bg">
      <Settings collapsibleGroupSlugs={['TODO']} route={Route} />
      <div>
        {[].map((tagGroup, i) => (
          <TagGroupBlock key={i} tagGroup={tagGroup} route={Route} />
        ))}
      </div>
    </div>
  )
}
