"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMiddlewareMetric = void 0;
function HttpMiddlewareMetric(client, config) {
    return function (req, res, next) {
        var start = Date.now();
        res.on('finish', function () {
            var end = Date.now();
            var labels = {
                Service: config.Service,
            };
            client.Histogram('http_request_duration_histogram_milliseconds', end - start, labels);
        });
        next();
    };
}
exports.HttpMiddlewareMetric = HttpMiddlewareMetric;
