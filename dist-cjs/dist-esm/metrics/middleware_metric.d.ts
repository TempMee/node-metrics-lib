import { Request, Response, NextFunction } from 'express';
import { Client } from '../client';
export interface HttpMiddlewareMetricConfig {
    Service: string;
}
export declare function HttpMiddlewareMetric(client: Client, config: HttpMiddlewareMetricConfig): (req: Request, res: Response, next: NextFunction) => void;
