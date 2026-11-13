'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { JobCard } from './JobCard';
import { EmptyState } from './EmptyState';
import { JobsSkeleton } from './JobsSkeleton';
import type { JobDTO } from '@/lib/types';

interface JobListProps {
  jobs: JobDTO[];
  loading: boolean;
  hasFilters: boolean;
  onClear: () => void;
}

/** Lista com entrada escalonada dos cards (desligada se o usuário pedir menos movimento). */
export function JobList({ jobs, loading, hasFilters, onClear }: JobListProps) {
  const reduceMotion = useReducedMotion();

  if (loading) return <JobsSkeleton />;

  if (jobs.length === 0) {
    return <EmptyState hasFilters={hasFilters} onClear={onClear} />;
  }

  return (
    <ul className="space-y-4">
      <AnimatePresence initial={false} mode="popLayout">
        {jobs.map((job, index) => (
          <motion.li
            key={job.id}
            layout={!reduceMotion}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
              delay: reduceMotion ? 0 : Math.min(index, 8) * 0.04,
            }}
          >
            <JobCard job={job} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
