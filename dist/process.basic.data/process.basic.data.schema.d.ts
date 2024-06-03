/// <reference types="mongoose/types/PipelineStage" />
import { Document, Schema as MongooseSchema } from 'mongoose';
declare class IoInfo {
    inputs: string;
    outputs: string;
    business_outcome: string;
    major_requirements: string;
}
declare class Activity {
    _id: string;
    sr_no: string;
    description: string;
    performed_at: string;
    performed_by: string;
    performed_where: string;
    value_calculation_logic: string;
    accounts_postings: string;
    is_deleted: boolean;
}
declare class Workflow {
    _id: string;
    title: string;
    description: string;
    technology: string;
    levels: string;
    roles: string;
    activity_id: string;
    automation_id: string;
    integration_scenario_id: string;
    is_deleted: boolean;
}
declare class Kpi {
    _id: string;
    title: string;
    description: string;
    calculation_logic: string;
    complexity_level: string;
    type: string;
    role: string;
    activity_id: string;
    automation_id: string;
    integration_scenario_id: string;
    is_deleted: boolean;
}
declare class Report {
    _id: string;
    title: string;
    description: string;
    attachments: string;
    complexity_level: string;
    type: string;
    application: string;
    source_data: string;
    role: string;
    activity_id: string;
    automation_id: string;
    integration_scenario_id: string;
    is_deleted: boolean;
}
declare class AnalyticalDashboard {
    _id: string;
    title: string;
    description: string;
    attachments: string;
    complexity_level: string;
    type: string;
    dashboard_application: string;
    source_data: string;
    role: string;
    activity_id: string;
    automation_id: string;
    integration_scenario_id: string;
    is_deleted: boolean;
}
declare class ProcessControlAndMonitoring {
    workflows: Workflow[];
    kpis: Kpi[];
    reports: Report[];
    analytical_dashboards: AnalyticalDashboard[];
}
declare class QueriesAndResponses {
    _id: string;
    query: string;
    response: string;
    is_deleted: boolean;
}
declare class MDO {
    _id: string;
    title: string;
    description: string;
    activity_id: string;
    is_deleted: boolean;
}
declare class DataManagement {
    _id: string;
    average_transactions: string;
    maximum_transactions_month: string;
    maximum_transactions_day: string;
    average_line_items: string;
    data_security: string;
    data_retention: string;
    data_residency: string;
    activity_id: string;
}
declare class DataManagementData {
    master_data_objects: MDO[];
    data_management_info: DataManagement;
}
declare class IntegrationScenario {
    _id: string;
    title: string;
    description: string;
    data_provider: string;
    data_consumer: string;
    api_provider: string;
    calling_system: string;
    type: string;
    data_volume_year: string;
    mode: string;
    data_type: string;
    protocol: string;
    tool: string;
    data_record_size: string;
    yoy_data_growth: string;
    data_provider_authentication: string;
    data_consumer_authentication: string;
    activity_id: string;
    mdo_id: string;
}
declare class ProcessDocument {
    _id: string;
    title: string;
    desc: string;
    type: string;
    source: string;
    number_range: string;
    storage_requirements: string;
    attachments: string;
    activity_id: string;
    is_deleted: boolean;
}
declare class AutomationScenario {
    _id: string;
    type: string;
    title: string;
    desc: string;
    technology: string;
    activity_id: string;
    mdo_id: string;
    integration_scenario_id: string;
    is_deleted: boolean;
}
declare class ComplianceScenarioData {
    _id: string;
    title: string;
    description: string;
    attachments: string;
    activity_id: string;
    automation_id: string;
    integration_scenario_id: string;
    is_deleted: boolean;
}
declare class AuditTrailScenarios {
    _id: string;
    title: string;
    description: string;
    activity_id: string;
    automation_id: string;
    attachments: string;
    integration_scenario_id: string;
    role: string;
    is_deleted: boolean;
}
declare class ComplianceScenario {
    compliance_scenario_data: ComplianceScenarioData[];
    audit_trail_scenarios: AuditTrailScenarios[];
}
declare class ProcessControl {
    _id: string;
    title: string;
    description: string;
    activity_id: string;
    mdo_id: string;
    is_deleted: boolean;
}
export declare class ProcessBasicData extends Document {
    _id: MongooseSchema.Types.ObjectId;
    function_id: string;
    sub_function_id: string;
    title: string;
    version_type: string;
    version_id: string;
    sop_reference: string;
    owner_name: string;
    owner_role_designation: string;
    release_status: string;
    description: string;
    trigger: string;
    created_by: string;
    created_on: Date;
    last_modified_by: string;
    last_modified_on: Date;
    is_deleted: boolean;
    io_info: IoInfo;
    activities: Activity[];
    control_and_monitoring?: ProcessControlAndMonitoring;
    queries_and_responses: QueriesAndResponses[];
    data_management: DataManagementData;
    integration_scenario: IntegrationScenario;
    documents: ProcessDocument[];
    automation_scenarios: AutomationScenario[];
    compliance_scenarios: ComplianceScenario;
    controls: ProcessControl[];
}
export declare const ProcessBasicDataSchema: MongooseSchema<ProcessBasicData, import("mongoose").Model<ProcessBasicData, any, any, any>, any, any>;
export {};
