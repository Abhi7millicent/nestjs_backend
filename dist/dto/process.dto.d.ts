export declare class ActivityDto {
    _id: string;
    sr_no: string;
    description: string;
    performed_at: string;
    performed_by: string;
    performed_where: string;
    value_calculation_logic: string;
    accounts_postings: string;
    last_modified_by: string;
    is_deleted: boolean;
}
export declare class WorkflowsDto {
    _id: string;
    title: string;
    description: string;
    technology: string;
    levels: string;
    roles: string;
    activity_id: string;
    automation_id: string;
    integration_scenario_id: string;
    last_modified_by: string;
    is_deleted: boolean;
}
export declare class KpisDto {
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
export declare class ReportsDto {
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
export declare class AnalyticalDashboardsDto {
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
export declare class QueriesAndResponsesDto {
    _id: string;
    query: string;
    response: string;
    is_deleted: boolean;
}
export declare class MDO {
    _id: string;
    title: string;
    description: string;
    activity_id: string;
    is_deleted: boolean;
}
