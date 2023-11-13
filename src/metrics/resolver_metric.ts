import { Result } from '../standard_metrics'
import { Client } from '../client'

export interface ResolverMetricLabels {
  Resolver: string
  Service: string
  Protocol: string
  Result: Result
}

export function ResolverMetric(
  client: Client,
  value: number,
  labels: ResolverMetricLabels,
) {
  const labelsRecord = {
    Resolver: labels.Resolver,
    Service: labels.Service,
    Protocol: labels.Protocol,
    Result: labels.Result,
  }
  client.Histogram(
    'resolver_request_duration_histogram_milliseconds',
    value,
    labelsRecord,
  )
}
