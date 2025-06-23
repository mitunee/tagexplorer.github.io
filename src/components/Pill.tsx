export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
}

export const Pill = ({ label: tag, ...props }: PillProps) => {
  return (
    <div
      {...props}
      className={[
        'bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200 rounded-full px-3 py-1 text-sm font-semibold text-nowrap',
        props.className,
      ].join(' ')}
    >
      {tag}
    </div>
  )
}
