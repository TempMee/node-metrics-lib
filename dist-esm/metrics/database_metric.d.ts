import { Result } from '../standard_metrics';
import { Client } from '../client';
export declare enum DatabaseMetricMethod {
    Insert = "insert",
    Update = "update",
    Delete = "delete",
    Select = "select"
}
export interface DatabaseMetricLabels {
    Service: string;
    Table: string;
    Method: DatabaseMetricMethod;
    Result: Result;
}
export declare function DatabaseMetric(client: Client, value: number, labels: DatabaseMetricLabels): void;
