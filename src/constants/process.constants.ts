
export const PROCESS = {
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

export enum controlAndMonitoringData {
    I = "workflows",
    II = "kpis",
    III = "reports",
    IV = "analytical_dashboards"
  }
  
  export const controlAndMonitoring: { [key in controlAndMonitoringData]: string } = {
    [controlAndMonitoringData.I]: "workflows",
    [controlAndMonitoringData.II]: "kpis",
    [controlAndMonitoringData.III]: "reports",
    [controlAndMonitoringData.IV]: "analytical_dashboards",
  };

  export const workflow = "wf_";

//   export enum process { [key in controlAndMonitoringData]: string } = {
//     [controlAndMonitoringData.I]: "workflows",
//     [controlAndMonitoringData.II]: "kpis",
//     [controlAndMonitoringData.III]: "reports",
//     [controlAndMonitoringData.IV]: "analytical_dashboards",
//   };

