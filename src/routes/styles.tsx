import { createFileRoute } from '@tanstack/react-router'
import '../index.css'
import '../normalize.css'
import { styleTagGroups } from '../tagGroups'
import { Settings, TagGroupBlock } from '../Components'

export const Route = createFileRoute('/styles')({
  component: Styles,
})

function Styles() {
  return (
    <div className="py-3 px-5 bg">
      <Settings mode="Styles" route={Route} />
      <div>
        {styleTagGroups.map((tagGroup, i) => (
          <TagGroupBlock key={i} tagGroup={tagGroup} route={Route} />
        ))}
      </div>
    </div>
  )
}
