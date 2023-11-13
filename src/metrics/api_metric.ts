import { Result } from '../standard_metrics'
import { Client } from '../client'

export interface ApiMetricLabels {
  Service: string
  Vendor: string
  Call: string
  Result: Result
}

export function ApiMetric(
  client: Client,
  value: number,
  labels: ApiMetricLabels,
) {
  const labelsRecord = {
    Service: labels.Service,
    Vendor: labels.Vendor,
    Call: labels.Call,
    Result: labels.Result,
  }
  client.Histogram(
    'api_request_duration_histogram_milliseconds',
    value,
    labelsRecord,
  )
}
