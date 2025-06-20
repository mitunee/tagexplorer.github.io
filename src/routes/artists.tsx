import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/artists')({
  component: Artists,
})

function Artists() {
  return <div className="p-2">artists</div>
}
