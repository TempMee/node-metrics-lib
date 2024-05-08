"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseMetric = exports.DatabaseMetricMethod = void 0;
var DatabaseMetricMethod;
(function (DatabaseMetricMethod) {
    DatabaseMetricMethod["Insert"] = "insert";
    DatabaseMetricMethod["Update"] = "update";
    DatabaseMetricMethod["Delete"] = "delete";
    DatabaseMetricMethod["Select"] = "select";
})(DatabaseMetricMethod || (exports.DatabaseMetricMethod = DatabaseMetricMethod = {}));
function DatabaseMetric(client, value, labels) {
    var labelsRecord = {
        Service: labels.Service,
        Table: labels.Table,
        Method: labels.Method,
        Result: labels.Result,
    };
    client.Histogram('database_duration_histogram_milliseconds', value, labelsRecord);
}
exports.DatabaseMetric = DatabaseMetric;
