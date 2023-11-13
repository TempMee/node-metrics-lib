import { Result } from '../standard_metrics'
import { Client } from '../client'
import {
  DatabaseMetric,
  DatabaseMetricLabels,
  DatabaseMetricMethod,
} from './database_metric'

describe('database_metrics', () => {
  it('should call Histogram', () => {
    const client = {
      Histogram: jest.fn(),
    }

    DatabaseMetric(client as unknown as Client, 123, {
      Service: 'service',
      Table: 'table',
      Method: DatabaseMetricMethod.Insert,
      Result: Result.Success,
    } as DatabaseMetricLabels)

    expect(client.Histogram).toHaveBeenCalledWith(
      'database_duration_histogram_milliseconds',
      123,
      {
        Service: 'service',
        Table: 'table',
        Method: DatabaseMetricMethod.Insert,
        Result: Result.Success,
      },
    )
  })
})
