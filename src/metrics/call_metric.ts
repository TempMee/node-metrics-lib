import { Result } from '../standard_metrics'
import { Client } from '../client'

export interface CallMetricLabels {
  Service: string
  Function: string
  Result: Result
}

export function CallMetric(
  client: Client,
  value: number,
  labels: CallMetricLabels,
) {
  const labelsRecord = {
    Service: labels.Service,
    Function: labels.Function,
    Result: labels.Result,
  }
  client.Histogram('call_duration_histogram_milliseconds', value, labelsRecord)
}
