import { Request, Response, NextFunction } from 'express'
import { Client } from '../client'

export interface HttpMiddlewareMetricConfig {
  Service: string
}

export function HttpMiddlewareMetric(
  client: Client,
  config: HttpMiddlewareMetricConfig,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now()
    res.on('finish', () => {
      const end = Date.now()
      const labels = {
        Service: config.Service,
      }
      client.Histogram(
        'http_request_duration_histogram_milliseconds',
        end - start,
        labels,
      )
    })
    next()
  }
}
