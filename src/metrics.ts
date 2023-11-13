import { Request, Response, NextFunction } from 'express'
import { StandardMetrics } from './standard_metrics'
import { ResolverMetric, ResolverMetricLabels } from './metrics/resolver_metric'
import { ApiMetric, ApiMetricLabels } from './metrics/api_metric'
import {
  HttpMiddlewareMetric,
  HttpMiddlewareMetricConfig,
} from './metrics/middleware_metric'
import { CallMetric, CallMetricLabels } from './metrics/call_metric'
import { DatabaseMetric, DatabaseMetricLabels } from './metrics/database_metric'
import { Client } from './client'

export interface MetricsImpl extends StandardMetrics {
  Histogram(name: string, value: number, labels: Record<string, string>): void
  Count(name: string, labels: Record<string, string>): void
  Gauge(name: string, value: number, labels: Record<string, string>): void
  Summary(name: string, value: number, labels: Record<string, string>): void
}
export class Metrics implements MetricsImpl {
  private static instance: Metrics
  private readonly client: Client

  private constructor(client: Client) {
    this.client = client
  }

  public static getInstance(client: Client): Metrics {
    if (!Metrics.instance) {
      Metrics.instance = new Metrics(client)
    }

    return Metrics.instance
  }

  public Histogram(
    name: string,
    value: number,
    labels: Record<string, string>,
  ): void {
    this.client.Histogram(name, value, labels)
  }

  public Count(name: string, labels: Record<string, string>): void {
    this.client.Count(name, labels)
  }

  public Gauge(
    name: string,
    value: number,
    labels: Record<string, string>,
  ): void {
    this.client.Gauge(name, value, labels)
  }

  public Summary(
    name: string,
    value: number,
    labels: Record<string, string>,
  ): void {
    this.client.Summary(name, value, labels)
  }

  public ResolverMetric(value: number, labels: ResolverMetricLabels): void {
    return ResolverMetric(this.client, value, labels)
  }

  public ApiMetric(value: number, labels: ApiMetricLabels): void {
    return ApiMetric(this.client, value, labels)
  }

  public HttpMiddlewareMetric(
    config: HttpMiddlewareMetricConfig,
  ): (req: Request, res: Response, next: NextFunction) => void {
    return HttpMiddlewareMetric(this.client, config)
  }

  public CallMetric(value: number, labels: CallMetricLabels): void {
    return CallMetric(this.client, value, labels)
  }

  public DatabaseMetric(value: number, labels: DatabaseMetricLabels): void {
    return DatabaseMetric(this.client, value, labels)
  }
}
