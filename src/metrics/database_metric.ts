import { Result } from '../standard_metrics'
import { Client } from '../client'

export enum DatabaseMetricMethod {
  Insert = 'insert',
  Update = 'update',
  Delete = 'delete',
  Select = 'select',
}

export interface DatabaseMetricLabels {
  Service: string
  Table: string
  Method: DatabaseMetricMethod
  Result: Result
}

export function DatabaseMetric(
  client: Client,
  value: number,
  labels: DatabaseMetricLabels,
) {
  const labelsRecord = {
    Service: labels.Service,
    Table: labels.Table,
    Method: labels.Method,
    Result: labels.Result,
  }
  client.Histogram(
    'database_duration_histogram_milliseconds',
    value,
    labelsRecord,
  )
}
