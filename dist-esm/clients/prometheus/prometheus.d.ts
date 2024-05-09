export declare class PrometheusClient {
    private readonly HistogramVecs;
    private readonly CounterVecs;
    private readonly GaugeVecs;
    private readonly SummaryVecs;
    constructor();
    CreateHistogramVec(name: string, help: string, labelNames: string[], buckets?: number[]): void;
    CreateCounterVec(name: string, help: string, labelNames: string[]): void;
    CreateGaugeVec(name: string, help: string, labelNames: string[]): void;
    CreateSummaryVec(name: string, help: string, labelNames: string[]): void;
    Histogram(name: string, value: number, labels: Record<string, string>): void;
    Count(name: string, labels: Record<string, string>): void;
    Gauge(name: string, value: number, labels: Record<string, string>): void;
    Summary(name: string, value: number, labels: Record<string, string>): void;
}
