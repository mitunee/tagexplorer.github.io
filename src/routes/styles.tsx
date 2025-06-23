import { createFileRoute } from '@tanstack/react-router'
import { styleTagGroups } from '../tagGroups'
import { TagGroupBlock } from '../components/TagGroupBlock'
import { Settings } from '../components/Settings'

export const Route = createFileRoute('/styles')({
  component: Styles,
  head: () => ({
    meta: [{ title: 'Styles - tagexplorer' }],
  }),
})

function Styles() {
  return (
    <div className="py-3 px-5 bg">
      <Settings collapsibleGroupSlugs={styleTagGroups.map((g) => g.slug)} route={Route} />
      <div>
        {styleTagGroups.map((tagGroup, i) => (
          <TagGroupBlock key={i} tagGroup={tagGroup} route={Route} />
        ))}
      </div>
    </div>
  )
}
