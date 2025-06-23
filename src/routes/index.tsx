import { createFileRoute } from '@tanstack/react-router'
import '../styles/normalize.css'
import '../styles/index.css'
import { faceTagGroups } from '../tagGroups'
import { TagGroupBlock } from '../components/TagGroupBlock'
import { Settings } from '../components/Settings'

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({
    meta: [{ title: 'Heads - tagexplorer' }],
  }),
})

function Index() {
  return (
    <div className="py-3 px-5 bg">
      <Settings collapsibleGroupSlugs={faceTagGroups.map((g) => g.slug)} route={Route} />
      <div>
        {faceTagGroups.map((tagGroup, i) => (
          <TagGroupBlock key={i} tagGroup={tagGroup} route={Route} />
        ))}
      </div>
    </div>
  )
}
