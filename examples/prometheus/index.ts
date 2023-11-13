import { Request, Response } from 'express'
import Prometheus from 'prom-client'
import { PrometheusClient } from '../../src/clients/prometheus/prometheus'
import { Metrics } from '../../src/metrics'
import { Result } from '../../src/standard_metrics'

const prometheusClient = new PrometheusClient()

prometheusClient.CreateHistogramVec(
  'graphql_resolver_millisecond4',
  'graphql resolver millisecond',
  ['resolver', 'service', 'result'],
  [
    // create buckets 10000 split into 10 buckets
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
  ],
)

const metrics = Metrics.getInstance(prometheusClient)

function sleep() {
  console.log('sleeping')
  return new Promise((resolve) => {
    const sleep = Math.floor(Math.random() * 3) + 1
    setTimeout(() => {
      resolve(sleep)
    }, sleep * 1000)
  })
}

const asyncFunc = async () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async () => {
    await sleep()
    const random = Math.floor(Math.random() * 3) + 1
    // random integer between 1 and 10000
    const random2 = Math.floor(Math.random() * 10000) + 1
    if (random === 1) {
      metrics.Histogram('graphql_resolver_millisecond4', random2, {
        resolver: 'resolver',
        service: 'node-js-client',
        result: Result.Error,
      })
    } else {
      metrics.Histogram('graphql_resolver_millisecond4', random2, {
        resolver: 'resolver',
        service: 'node-js-client',
        result: Result.Success,
      })
    }
    await asyncFunc()
  })
}

asyncFunc()

// run the server
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
const app = express()
const port = 2113

app.get('/metrics', (req: Request, res: Response) => {
  res.set('Content-Type', Prometheus.register.contentType)
  Prometheus.register.metrics().then((data) => res.send(data))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
