export interface NormalizedJob {
  externalJobId: string;
  platform: 'LINKEDIN';
  title: string;
  company: string;
  location?: string | null;
  jobUrl: string;
  description: string;
  matchedKeywords: string[];
  postedAt?: Date | null;
}

export interface JobPlatformAdapter {
  readonly platformName: string;
  fetchJobs(query: { keywords: string[]; location?: string }): Promise<NormalizedJob[]>;
}
