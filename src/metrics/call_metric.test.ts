import { Client } from '../client'
import { Result } from '../standard_metrics'
import { CallMetric, CallMetricLabels } from './call_metric'

describe('call_metric', () => {
  it('should call Histogram', () => {
    const client = {
      Histogram: jest.fn(),
    }

    CallMetric(client as unknown as Client, 123, {
      Service: 'service',
      Function: 'function',
      Result: Result.Success,
    } as CallMetricLabels)

    expect(client.Histogram).toHaveBeenCalledWith(
      'call_duration_histogram_milliseconds',
      123,
      {
        Service: 'service',
        Function: 'function',
        Result: Result.Success,
      },
    )
  })
})
