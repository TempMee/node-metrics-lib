import express from 'express'
import request from 'supertest'
import { Client } from '../client'
import {
  HttpMiddlewareMetric,
  HttpMiddlewareMetricConfig,
} from './middleware_metric'

describe('middleware_metric', () => {
  it('should call Histogram', async (): Promise<void> => {
    const client = {
      Histogram: jest.fn(),
    }
    const app = express()
    const handler = HttpMiddlewareMetric(
      client as unknown as Client,
      {
        Service: 'test',
      } as HttpMiddlewareMetricConfig,
    )
    app.use(handler)
    app.get('/test', (_req, res) => {
      // wait 1 second to simulate a slow request
      setTimeout(() => {
        res.send('ok')
      }, 1000)
    })

    await request(app).get('/test').expect(200)

    expect(client.Histogram).toHaveBeenCalled()

    expect(client.Histogram.mock.calls[0][1]).toBeGreaterThanOrEqual(1000)
  })
})
