import{tracer as e}from"dd-trace";import{Histogram as t,Counter as s,Gauge as i,Summary as r}from"prom-client";function c(e,t,s){const i={Resolver:s.Resolver,Service:s.Service,Protocol:s.Protocol,Result:s.Result};e.Histogram("resolver_request_duration_histogram_milliseconds",t,i)}function o(e,t,s){const i={Service:s.Service,Vendor:s.Vendor,Call:s.Call,Result:s.Result};e.Histogram("api_request_duration_histogram_milliseconds",t,i)}function a(e,t){return(s,i,r)=>{const c=Date.now();i.on("finish",(()=>{const s=Date.now(),i={Service:t.Service};e.Histogram("http_request_duration_histogram_milliseconds",s-c,i)})),r()}}function n(e,t,s){const i={Service:s.Service,Function:s.Function,Result:s.Result};e.Histogram("call_duration_histogram_milliseconds",t,i)}var u,l;function m(e,t,s){const i={Service:s.Service,Table:s.Table,Method:s.Method,Result:s.Result};e.Histogram("database_duration_histogram_milliseconds",t,i)}!function(e){e.Insert="insert",e.Update="update",e.Delete="delete",e.Select="select"}(u||(u={}));class h{constructor(e){this.client=e}static getInstance(e){return h.instance||(h.instance=new h(e)),h.instance}Histogram(e,t,s){this.client.Histogram(e,t,s)}Count(e,t){this.client.Count(e,t)}Gauge(e,t,s){this.client.Gauge(e,t,s)}Summary(e,t,s){this.client.Summary(e,t,s)}ResolverMetric(e,t){return c(this.client,e,t)}ApiMetric(e,t){return o(this.client,e,t)}HttpMiddlewareMetric(e){return a(this.client,e)}CallMetric(e,t){return n(this.client,e,t)}DatabaseMetric(e,t){return m(this.client,e,t)}}!function(e){e.Success="success",e.Error="error"}(l||(l={}));class g{constructor(){e.init()}Count(t,s,i=1){e.dogstatsd.increment(t,i,s)}Histogram(t,s,i,r=1){e.dogstatsd.distribution(t,s,i)}Gauge(t,s,i,r=1){e.dogstatsd.gauge(t,s,i)}Summary(e,t,s,i=1){console.log("Summary is unsupported")}}class V{constructor(){this.HistogramVecs={},this.CounterVecs={},this.GaugeVecs={},this.SummaryVecs={}}CreateHistogramVec(e,s,i,r){this.HistogramVecs[e]||(this.HistogramVecs[e]={Labels:i,Metric:new t({name:e,help:s,labelNames:i,buckets:r})})}CreateCounterVec(e,t,i){this.CounterVecs[e]||(this.CounterVecs[e]={Labels:i,Metric:new s({name:e,help:t,labelNames:i})})}CreateGaugeVec(e,t,s){this.GaugeVecs[e]||(this.GaugeVecs[e]={Labels:s,Metric:new i({name:e,help:t,labelNames:s})})}CreateSummaryVec(e,t,s){this.SummaryVecs[e]||(this.SummaryVecs[e]={Labels:s,Metric:new r({name:e,help:t,labelNames:s})})}Histogram(e,t,s){const i=Object.keys(s);this.HistogramVecs[e]||this.CreateHistogramVec(e,e,i);const r=[];for(const t of this.HistogramVecs[e].Labels)r.push(s[t]);this.HistogramVecs[e].Metric.labels(...r).observe(t)}Count(e,t){const s=Object.keys(t);this.CounterVecs[e]||this.CreateCounterVec(e,e,s);const i=[];for(const s of this.CounterVecs[e].Labels)i.push(t[s]);this.CounterVecs[e].Metric.labels(...i).inc()}Gauge(e,t,s){const i=Object.keys(s);this.GaugeVecs[e]||this.CreateGaugeVec(e,e,i);const r=[];for(const t of this.GaugeVecs[e].Labels)r.push(s[t]);this.GaugeVecs[e].Metric.labels(...r).set(t)}Summary(e,t,s){const i=Object.keys(s);this.SummaryVecs[e]||this.CreateSummaryVec(e,e,i);const r=[];for(const t of this.SummaryVecs[e].Labels)r.push(s[t]);this.SummaryVecs[e].Metric.labels(...r).observe(t)}}export{o as ApiMetric,n as CallMetric,g as DataDogClient,m as DatabaseMetric,a as HttpMiddlewareMetric,h as Metrics,V as PrometheusClient,c as ResolverMetric,l as Result};