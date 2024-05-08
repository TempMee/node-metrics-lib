"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverMetric = void 0;
function ResolverMetric(client, value, labels) {
    var labelsRecord = {
        Resolver: labels.Resolver,
        Service: labels.Service,
        Protocol: labels.Protocol,
        Result: labels.Result,
    };
    client.Histogram('resolver_request_duration_histogram_milliseconds', value, labelsRecord);
}
exports.ResolverMetric = ResolverMetric;
