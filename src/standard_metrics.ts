import { Request, Response, NextFunction } from 'express'
import { ResolverMetricLabels } from './metrics/resolver_metric'
import { ApiMetricLabels } from './metrics/api_metric'
import { DatabaseMetricLabels } from './metrics/database_metric'
import { CallMetricLabels } from './metrics/call_metric'
import { HttpMiddlewareMetricConfig } from './metrics/middleware_metric'

export enum Result {
  Success = 'success',
  Error = 'error',
}

export interface StandardMetrics {
  ResolverMetric(value: number, labels: ResolverMetricLabels): void
  HttpMiddlewareMetric(
    config: HttpMiddlewareMetricConfig,
  ): (req: Request, res: Response, next: NextFunction) => void
  ApiMetric(value: number, labels: ApiMetricLabels): void
  DatabaseMetric(value: number, labels: DatabaseMetricLabels): void
  CallMetric(value: number, labels: CallMetricLabels): void
}
