import { Gauge, Histogram, Summary, Counter } from 'prom-client'

interface MetricWithLabelNames<T> {
  Labels: string[]
  Metric: T
}
export class PrometheusClient {
  private readonly HistogramVecs: Record<
    string,
    MetricWithLabelNames<Histogram<string>>
  >
  private readonly CounterVecs: Record<
    string,
    MetricWithLabelNames<Counter<string>>
  >
  private readonly GaugeVecs: Record<
    string,
    MetricWithLabelNames<Gauge<string>>
  >
  private readonly SummaryVecs: Record<
    string,
    MetricWithLabelNames<Summary<string>>
  >

  constructor() {
    this.HistogramVecs = {}
    this.CounterVecs = {}
    this.GaugeVecs = {}
    this.SummaryVecs = {}
  }

  public CreateHistogramVec(
    name: string,
    help: string,
    labelNames: string[],
    buckets?: number[],
  ): void {
    if (this.HistogramVecs[name]) {
      return
    }
    this.HistogramVecs[name] = {
      Labels: labelNames,
      Metric: new Histogram({
        name: name,
        help: help,
        labelNames: labelNames,
        buckets: buckets,
      }),
    }
  }

  public CreateCounterVec(
    name: string,
    help: string,
    labelNames: string[],
  ): void {
    if (this.CounterVecs[name]) {
      return
    }
    this.CounterVecs[name] = {
      Labels: labelNames,
      Metric: new Counter({
        name: name,
        help: help,
        labelNames: labelNames,
      }),
    }
  }

  public CreateGaugeVec(
    name: string,
    help: string,
    labelNames: string[],
  ): void {
    if (this.GaugeVecs[name]) {
      return
    }
    this.GaugeVecs[name] = {
      Labels: labelNames,
      Metric: new Gauge({
        name: name,
        help: help,
        labelNames: labelNames,
      }),
    }
  }

  public CreateSummaryVec(
    name: string,
    help: string,
    labelNames: string[],
  ): void {
    if (this.SummaryVecs[name]) {
      return
    }
    this.SummaryVecs[name] = {
      Labels: labelNames,
      Metric: new Summary({
        name: name,
        help: help,
        labelNames: labelNames,
      }),
    }
  }

  public Histogram(
    name: string,
    value: number,
    labels: Record<string, string>,
  ): void {
    const labelNames = Object.keys(labels)

    if (!this.HistogramVecs[name]) {
      this.CreateHistogramVec(name, name, labelNames)
    }

    const labelValues = []

    for (const labelName of this.HistogramVecs[name].Labels) {
      labelValues.push(labels[labelName])
    }

    this.HistogramVecs[name].Metric.labels(...labelValues).observe(value)
  }

  public Count(name: string, labels: Record<string, string>): void {
    const labelNames = Object.keys(labels)

    if (!this.CounterVecs[name]) {
      this.CreateCounterVec(name, name, labelNames)
    }

    const labelValues = []

    for (const labelName of this.CounterVecs[name].Labels) {
      labelValues.push(labels[labelName])
    }

    this.CounterVecs[name].Metric.labels(...labelValues).inc()
  }

  public Gauge(
    name: string,
    value: number,
    labels: Record<string, string>,
  ): void {
    const labelNames = Object.keys(labels)

    if (!this.GaugeVecs[name]) {
      this.CreateGaugeVec(name, name, labelNames)
    }

    const labelValues = []

    for (const labelName of this.GaugeVecs[name].Labels) {
      labelValues.push(labels[labelName])
    }

    this.GaugeVecs[name].Metric.labels(...labelValues).set(value)
  }

  public Summary(
    name: string,
    value: number,
    labels: Record<string, string>,
  ): void {
    const labelNames = Object.keys(labels)

    if (!this.SummaryVecs[name]) {
      this.CreateSummaryVec(name, name, labelNames)
    }

    const labelValues = []

    for (const labelName of this.SummaryVecs[name].Labels) {
      labelValues.push(labels[labelName])
    }

    this.SummaryVecs[name].Metric.labels(...labelValues).observe(value)
  }
}
