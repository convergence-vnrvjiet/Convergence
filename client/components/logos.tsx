const PLACEHOLDER_COUNT = 16

export function Logos({ count = PLACEHOLDER_COUNT }: { count?: number }) {
  return (
    <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex aspect-square items-center justify-center border border-border text-[10px] text-muted-foreground"
        >
          Logo
        </div>
      ))}
    </div>
  )
}
