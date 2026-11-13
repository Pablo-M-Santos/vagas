import { Building2, Clock, ExternalLink, MapPin } from 'lucide-react';
import { relativeTime, sourceDomain } from '@/lib/format';
import type { JobDTO } from '@/lib/types';

interface JobCardProps {
  job: JobDTO;
}

/**
 * Card da vaga: título (link completo), empresa, local, salário quando
 * existir, keywords e o link de origem abrindo em nova aba.
 */
export function JobCard({ job }: JobCardProps) {
  const when = relativeTime(job.postedAt ?? job.createdAt);

  return (
    <article className="group rounded-xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold leading-snug text-ink">
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {job.title}
              <span className="sr-only"> (abrir vaga em nova aba)</span>
            </a>
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
              <Building2 size={14} aria-hidden />
              {job.company}
            </span>
            {job.location ? (
              <>
                <span aria-hidden className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} aria-hidden />
                  {job.location}
                </span>
              </>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 text-right">
          {job.salary ? (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              {job.salary}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Salário não informado
            </span>
          )}
        </div>
      </div>

      {job.keywords.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {job.keywords.map((keyword) => (
            <li
              key={keyword}
              className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent"
            >
              {keyword}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Clock size={13} aria-hidden />
          {when}
        </span>
        <span className="hidden truncate sm:inline">{sourceDomain(job.jobUrl)}</span>
        <a
          href={job.jobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-accent transition-colors hover:text-indigo-800"
        >
          Abrir vaga
          <ExternalLink size={13} aria-hidden />
        </a>
      </div>
    </article>
  );
}
