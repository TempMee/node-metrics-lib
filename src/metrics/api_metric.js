"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMetric = void 0;
function ApiMetric(client, value, labels) {
    var labelsRecord = {
        Service: labels.Service,
        Vendor: labels.Vendor,
        Call: labels.Call,
        Result: labels.Result,
    };
    client.Histogram('api_request_duration_histogram_milliseconds', value, labelsRecord);
}
exports.ApiMetric = ApiMetric;
