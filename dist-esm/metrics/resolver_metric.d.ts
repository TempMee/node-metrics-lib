import { Result } from '../standard_metrics';
import { Client } from '../client';
export interface ResolverMetricLabels {
    Resolver: string;
    Service: string;
    Protocol: string;
    Result: Result;
}
export declare function ResolverMetric(client: Client, value: number, labels: ResolverMetricLabels): void;
