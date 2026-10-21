import { analyzeJob } from './index';
import { NormalizedJob } from '../types/job';

const job: NormalizedJob = {
    externalJobId: '1',
    platform: 'LINKEDIN',
    title: 'Desenvolvedor Java Júnior',
    company: 'TechCorp',
    jobUrl: 'http://test.com',
    description: 'Vaga para Java Júnior com React.',
    matchedKeywords: []
};

const result = analyzeJob(job, ['Java', 'React']);
console.log('Análise:', result);
if (result.approved) {
    console.log('Teste #5 (Analyzer) aprovado!');
} else {
    process.exit(1);
}
