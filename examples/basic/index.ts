import { DataDogClient } from '../../src/clients/datadog/datadog'
import { Metrics } from '../../src/metrics'
import { Result } from '../../src/standard_metrics'

const dataDogClient = new DataDogClient()

const metricsClient = Metrics.getInstance(dataDogClient)

metricsClient.ResolverMetric(100, {
  Resolver: 'resolver',
  Service: 'node-js-client',
  Protocol: 'http',
  Result: Result.Success,
})

metricsClient.Summary('summary', 100, {
  Service: 'node-js-client',
  Protocol: 'http',
  Result: Result.Success,
})
