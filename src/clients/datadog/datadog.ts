import tracer from 'dd-trace'

export class DataDogClient {
  constructor() {
    tracer.init()
  }

  Count(
    metric: string,
    labels: Record<string, string>,
    rate: number = 1,
  ): void {
    tracer.dogstatsd.increment(metric, rate, labels)
  }

  Histogram(
    metric: string,
    value: number,
    labels: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _rate: number = 1,
  ): void {
    tracer.dogstatsd.distribution(metric, value, labels)
  }

  Gauge(
    metric: string,
    value: number,
    labels: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _rate: number = 1,
  ): void {
    tracer.dogstatsd.gauge(metric, value, labels)
  }

  Summary(
    _metric: string,
    _value: number,
    _labels: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _rate: number = 1,
  ): void {
    // show log here that Summary is unsupported
    console.log('Summary is unsupported')
  }
}
