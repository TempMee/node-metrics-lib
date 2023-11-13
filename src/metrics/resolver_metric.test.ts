import { Client } from '../client'
import { Result } from '../standard_metrics'
import { ResolverMetric, ResolverMetricLabels } from './resolver_metric'

describe('resolver_metric', () => {
  it('should call Histogram', () => {
    const client = {
      Histogram: jest.fn(),
    }

    ResolverMetric(client as unknown as Client, 1000, {
      Resolver: 'test',
      Service: 'test',
      Protocol: 'test',
      Result: Result.Success,
    } as ResolverMetricLabels)

    expect(client.Histogram).toHaveBeenCalledWith(
      'resolver_request_duration_histogram_milliseconds',
      1000,
      {
        Resolver: 'test',
        Service: 'test',
        Protocol: 'test',
        Result: Result.Success,
      },
    )
  })
})
