import { Request, Response, NextFunction } from 'express';
import { StandardMetrics } from './standard_metrics';
import { ResolverMetricLabels } from './metrics/resolver_metric';
import { ApiMetricLabels } from './metrics/api_metric';
import { HttpMiddlewareMetricConfig } from './metrics/middleware_metric';
import { CallMetricLabels } from './metrics/call_metric';
import { DatabaseMetricLabels } from './metrics/database_metric';
import { Client } from './client';
export interface MetricsImpl extends StandardMetrics {
    Histogram(name: string, value: number, labels: Record<string, string>): void;
    Count(name: string, labels: Record<string, string>): void;
    Gauge(name: string, value: number, labels: Record<string, string>): void;
    Summary(name: string, value: number, labels: Record<string, string>): void;
}
export declare class Metrics implements MetricsImpl {
    private static instance;
    private readonly client;
    private constructor();
    static getInstance(client: Client): Metrics;
    Histogram(name: string, value: number, labels: Record<string, string>): void;
    Count(name: string, labels: Record<string, string>): void;
    Gauge(name: string, value: number, labels: Record<string, string>): void;
    Summary(name: string, value: number, labels: Record<string, string>): void;
    ResolverMetric(value: number, labels: ResolverMetricLabels): void;
    ApiMetric(value: number, labels: ApiMetricLabels): void;
    HttpMiddlewareMetric(config: HttpMiddlewareMetricConfig): (req: Request, res: Response, next: NextFunction) => void;
    CallMetric(value: number, labels: CallMetricLabels): void;
    DatabaseMetric(value: number, labels: DatabaseMetricLabels): void;
}
