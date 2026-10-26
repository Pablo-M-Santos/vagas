export function JobsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-hidden>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-line bg-white p-5"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2.5">
              <div className="h-4 w-2/3 rounded bg-slate-200" />
              <div className="h-3.5 w-1/3 rounded bg-slate-100" />
            </div>
            <div className="h-7 w-28 rounded-full bg-slate-100" />
          </div>
          <div className="mt-4 flex gap-2">
            <div className="h-5 w-16 rounded-md bg-slate-100" />
            <div className="h-5 w-20 rounded-md bg-slate-100" />
            <div className="h-5 w-14 rounded-md bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
