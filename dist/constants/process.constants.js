"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflow = exports.controlAndMonitoring = exports.controlAndMonitoringData = exports.PROCESS = void 0;
exports.PROCESS = {
    activities: "activities",
    control_and_monitoring: {
        workflows: "workflows",
        kpis: "kpis",
        reports: "reports",
        analytical_dashboards: "analytical_dashboards"
    },
    queries_and_responses: "queries_and_responses",
    data_management: {
        master_data_objects: "master_data_objects",
        data_management_info: "data_management_info"
    },
    integration_scenario: "integration_scenario",
    documents: "documents",
    automation_scenarios: "automation_scenarios",
    compliance_scenarios: {
        compliance_scenario_data: "compliance_scenario_data",
        audit_trail_scenarios: "audit_trail_scenarios"
    },
    controls: "controls"
};
var controlAndMonitoringData;
(function (controlAndMonitoringData) {
    controlAndMonitoringData["I"] = "workflows";
    controlAndMonitoringData["II"] = "kpis";
    controlAndMonitoringData["III"] = "reports";
    controlAndMonitoringData["IV"] = "analytical_dashboards";
})(controlAndMonitoringData || (exports.controlAndMonitoringData = controlAndMonitoringData = {}));
exports.controlAndMonitoring = {
    [controlAndMonitoringData.I]: "workflows",
    [controlAndMonitoringData.II]: "kpis",
    [controlAndMonitoringData.III]: "reports",
    [controlAndMonitoringData.IV]: "analytical_dashboards",
};
exports.workflow = "wf_";
//# sourceMappingURL=process.constants.js.map