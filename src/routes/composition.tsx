import { createFileRoute } from '@tanstack/react-router'
import '../index.css'
import '../normalize.css'
import { compositionTagGroups } from '../tagGroups'
import { Settings, TagGroupBlock } from '../Components'

export const Route = createFileRoute('/composition')({
  component: Composition,
  head: () => ({
    meta: [{ title: 'Composition - tagexplorer' }],
  }),
})

function Composition() {
  return (
    <div className="py-3 px-5 bg">
      <Settings mode="Composition" route={Route} />
      <div>
        {compositionTagGroups.map((tagGroup, i) => (
          <TagGroupBlock key={i} tagGroup={tagGroup} route={Route} />
        ))}
      </div>
    </div>
  )
}
