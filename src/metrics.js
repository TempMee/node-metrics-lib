"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metrics = void 0;
var resolver_metric_1 = require("./metrics/resolver_metric");
var api_metric_1 = require("./metrics/api_metric");
var middleware_metric_1 = require("./metrics/middleware_metric");
var call_metric_1 = require("./metrics/call_metric");
var database_metric_1 = require("./metrics/database_metric");
var Metrics = /** @class */ (function () {
    function Metrics(client) {
        this.client = client;
    }
    Metrics.getInstance = function (client) {
        if (!Metrics.instance) {
            Metrics.instance = new Metrics(client);
        }
        return Metrics.instance;
    };
    Metrics.prototype.Histogram = function (name, value, labels) {
        this.client.Histogram(name, value, labels);
    };
    Metrics.prototype.Count = function (name, labels) {
        this.client.Count(name, labels);
    };
    Metrics.prototype.Gauge = function (name, value, labels) {
        this.client.Gauge(name, value, labels);
    };
    Metrics.prototype.Summary = function (name, value, labels) {
        this.client.Summary(name, value, labels);
    };
    Metrics.prototype.ResolverMetric = function (value, labels) {
        return (0, resolver_metric_1.ResolverMetric)(this.client, value, labels);
    };
    Metrics.prototype.ApiMetric = function (value, labels) {
        return (0, api_metric_1.ApiMetric)(this.client, value, labels);
    };
    Metrics.prototype.HttpMiddlewareMetric = function (config) {
        return (0, middleware_metric_1.HttpMiddlewareMetric)(this.client, config);
    };
    Metrics.prototype.CallMetric = function (value, labels) {
        return (0, call_metric_1.CallMetric)(this.client, value, labels);
    };
    Metrics.prototype.DatabaseMetric = function (value, labels) {
        return (0, database_metric_1.DatabaseMetric)(this.client, value, labels);
    };
    return Metrics;
}());
exports.Metrics = Metrics;
