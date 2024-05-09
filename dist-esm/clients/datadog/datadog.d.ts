export declare class DataDogClient {
    constructor();
    Count(metric: string, labels: Record<string, string>, rate?: number): void;
    Histogram(metric: string, value: number, labels: Record<string, string>, _rate?: number): void;
    Gauge(metric: string, value: number, labels: Record<string, string>, _rate?: number): void;
    Summary(_metric: string, _value: number, _labels: Record<string, string>, _rate?: number): void;
}
