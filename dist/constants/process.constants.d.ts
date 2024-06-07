export declare const PROCESS: {
    activities: string;
    control_and_monitoring: {
        workflows: string;
        kpis: string;
        reports: string;
        analytical_dashboards: string;
    };
    queries_and_responses: string;
    data_management: {
        master_data_objects: string;
        data_management_info: string;
    };
    integration_scenario: string;
    documents: string;
    automation_scenarios: string;
    compliance_scenarios: {
        compliance_scenario_data: string;
        audit_trail_scenarios: string;
    };
    controls: string;
};
export declare enum controlAndMonitoringData {
    I = "workflows",
    II = "kpis",
    III = "reports",
    IV = "analytical_dashboards"
}
export declare const controlAndMonitoring: {
    [key in controlAndMonitoringData]: string;
};
export declare const workflow = "wf_";
