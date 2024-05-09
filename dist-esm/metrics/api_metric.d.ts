import { Result } from '../standard_metrics';
import { Client } from '../client';
export interface ApiMetricLabels {
    Service: string;
    Vendor: string;
    Call: string;
    Result: Result;
}
export declare function ApiMetric(client: Client, value: number, labels: ApiMetricLabels): void;
