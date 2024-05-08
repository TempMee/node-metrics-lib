"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallMetric = void 0;
function CallMetric(client, value, labels) {
    var labelsRecord = {
        Service: labels.Service,
        Function: labels.Function,
        Result: labels.Result,
    };
    client.Histogram('call_duration_histogram_milliseconds', value, labelsRecord);
}
exports.CallMetric = CallMetric;
