export interface Client {
  Histogram(
    metric: string,
    value: number,
    labels: Record<string, string>,
    rate?: number,
  ): void
  Count(metric: string, labels: Record<string, string>, rate?: number): void
  Gauge(
    metric: string,
    value: number,
    labels: Record<string, string>,
    rate?: number,
  ): void
  Summary(
    metric: string,
    value: number,
    labels: Record<string, string>,
    rate?: number,
  ): void
}
