import { Result } from '../standard_metrics';
import { Client } from '../client';
export interface CallMetricLabels {
    Service: string;
    Function: string;
    Result: Result;
}
export declare function CallMetric(client: Client, value: number, labels: CallMetricLabels): void;
