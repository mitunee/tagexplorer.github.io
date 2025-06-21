import { createFileRoute } from '@tanstack/react-router'
import '../index.css'
import '../normalize.css'
import { allTagGroups } from '../tagGroups'
import { Settings, TagGroupBlock } from '../Components'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="py-3 px-5 bg">
      <Settings mode="Home" route={Route} />
      <div>
        {allTagGroups.map((tagGroup, i) => (
          <TagGroupBlock key={i} tagGroup={tagGroup} route={Route} />
        ))}
      </div>
    </div>
  )
}
