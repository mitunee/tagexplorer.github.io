import { createFileRoute } from '@tanstack/react-router'
import '../index.css'
import '../normalize.css'
import { faceTagGroups } from '../tagGroups'
import { Settings, TagGroupBlock } from '../Components'

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({
    meta: [{ title: 'Heads - tagexplorer' }],
  }),
})

function Index() {
  return (
    <div className="py-3 px-5 bg">
      <Settings mode="Heads" route={Route} />
      <div>
        {faceTagGroups.map((tagGroup, i) => (
          <TagGroupBlock key={i} tagGroup={tagGroup} route={Route} />
        ))}
      </div>
    </div>
  )
}
