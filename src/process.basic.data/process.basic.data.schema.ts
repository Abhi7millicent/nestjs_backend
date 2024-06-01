import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

class IoInfo {
  @Prop({ required: true })
  public inputs!: string;

  @Prop({ required: true })
  public outputs!: string;

  @Prop({ required: true })
  public business_outcome!: string;

  @Prop({ required: true })
  public major_requirements!: string;
}

class Activity {

  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // activity_id: MongooseSchema.Types.ObjectId;

   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  sr_no: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  performed_at!: string;

  @Prop({ required: true })
  performed_by!: string;

  @Prop({ required: true })
  performed_where!: string;

  @Prop({ required: true })
  value_calculation_logic!: string;

  @Prop({ required: true })
  accounts_postings!: string;
  
  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class Workflow {
  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // workflow_id: MongooseSchema.Types.ObjectId;

   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  technology!: string;

  @Prop({ required: true })
  levels!: string;

  @Prop({ required: true })
  roles!: string;

  @Prop({ required: true })
  activity_id!: string;

  @Prop({ required: true })
  automation_id!: string;

  @Prop({ required: true })
  integration_scenario_id!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class Kpi {
  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // kpi_id: MongooseSchema.Types.ObjectId;

   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  calculation_logic!: string;

  @Prop({ required: true })
  complexity_level!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  role!: string;

  @Prop({ required: true })
  activity_id!: string;

  @Prop({ required: true })
  automation_id!: string;

  @Prop({ required: true })
  integration_scenario_id!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class Report {
  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // report_id: MongooseSchema.Types.ObjectId;

   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  attachments!: string;

  @Prop({ required: true })
  complexity_level!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  application!: string;

  @Prop({ required: true })
  source_data!: string;

  @Prop({ required: true })
  role!: string;

  @Prop({ required: true })
  activity_id!: string;

  @Prop({ required: true })
  automation_id!: string;

  @Prop({ required: true })
  integration_scenario_id!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class AnalyticalDashboard {
  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // analytical_dashboard_id: MongooseSchema.Types.ObjectId;

   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  attachments!: string;

  @Prop({ required: true })
  complexity_level!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  dashboard_application!: string;

  @Prop({ required: true })
  source_data!: string;

  @Prop({ required: true })
  role!: string;

  @Prop({ required: true })
  activity_id!: string;

  @Prop({ required: true })
  automation_id!: string;

  @Prop({ required: true })
  integration_scenario_id!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class ProcessControlAndMonitoring {
  @Prop({ type: [Workflow], default: [] })
  workflows!: Workflow[];

  @Prop({ type: [Kpi], default: [] })
  kpis!: Kpi[];

  @Prop({ type: [Report], default: [] })
  reports!: Report[];

  @Prop({ type: [AnalyticalDashboard], default: [] })
  analytical_dashboards!: AnalyticalDashboard[];
  
}

class QueriesAndResponses {
   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  query!: string;

  @Prop({ required: true })
  response!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class MDO {
   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  activity_id!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class DataManagement {
  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // data_management_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  public _id: string;

  @Prop({ required: true })
  public average_transactions!: string;

  @Prop({ required: true })
  public maximum_transactions_month!: string;

  @Prop({ required: true })
  public maximum_transactions_day!: string;

  @Prop({ required: true })
  public average_line_items!: string;

  @Prop({ required: true })
  public data_security!: string;

  @Prop({ required: true })
  public data_retention!: string;

  @Prop({ required: true })
  public data_residency!: string;

  @Prop({ required: true })
  public activity_id!: string;
}

class DataManagementData {
  @Prop({ type: [MDO], default: [] })
  master_data_objects!: MDO[];

  @Prop({ type: DataManagement, required: true })
  public data_management_info!: DataManagement;
}

class IntegrationScenario {
  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // integration_scenario_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  public _id: string;

  @Prop({ required: true })
  public title!: string;

  @Prop({ required: true })
  public description!: string;

  @Prop({ required: true })
  public data_provider!: string;

  @Prop({ required: true })
  public data_consumer!: string;

  @Prop({ required: true })
  public api_provider!: string;

  @Prop({ required: true })
  public calling_system!: string;

  @Prop({ required: true })
  public type!: string;

  @Prop({ required: true })
  public data_volume_year!: string;

  @Prop({ required: true })
  public mode!: string;

  @Prop({ required: true })
  public data_type!: string;

  @Prop({ required: true })
  public protocol!: string;

  @Prop({ required: true })
  public tool!: string;

  @Prop({ required: true })
  public data_record_size!: string;

  @Prop({ required: true })
  public yoy_data_growth!: string;

  @Prop({ required: true })
  public data_provider_authentication!: string;

  @Prop({ required: true })
  public data_consumer_authentication!: string;

  @Prop({ required: true })
  public activity_id!: string;

  @Prop({ required: true })
  public mdo_id!: string;
}

class ProcessDocument {
  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // Process_document_id: MongooseSchema.Types.ObjectId;

   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  desc!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  source!: string;

  @Prop({ required: true })
  number_range!: string;

  @Prop({ required: true })
  storage_requirements!: string;

  @Prop({ required: true })
  attachments!: string;

  @Prop({ required: true })
  activity_id!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class AutomationScenario {
  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // automation_scenario_id: MongooseSchema.Types.ObjectId;

   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  desc!: string;

  @Prop({ required: true })
  technology!: string;

  @Prop({ required: true })
  activity_id!: string;

  @Prop({ required: true })
  mdo_id!: string;

  @Prop({ required: true })
  integration_scenario_id!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class ComplianceScenarioData {
  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // compliance_scenario_id: MongooseSchema.Types.ObjectId;

   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  attachments!: string;

  @Prop({ required: true })
  activity_id!: string;

  @Prop({ required: true })
  automation_id!: string;

  @Prop({ required: true })
  integration_scenario_id!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class AuditTrailScenarios {
   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  activity_id!: string;

  @Prop({ required: true })
  automation_id!: string;

  @Prop({ required: true })
  attachments!: string;

  @Prop({ required: true })
  integration_scenario_id!: string;

  @Prop({ required: true })
  role!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

class ComplianceScenario {
  @Prop({ type: [ComplianceScenarioData], default: [] })
  compliance_scenario_data!: ComplianceScenarioData[];

  @Prop({ type: [AuditTrailScenarios], default: [] })
  audit_trail_scenarios!: AuditTrailScenarios[];
}

class ProcessControl {
  // @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  // process_control_id: MongooseSchema.Types.ObjectId;

   @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  activity_id!: string;

  @Prop({ required: true })
  mdo_id!: string;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;
}

@Schema({ collection: 'process_basic_data' })
export class ProcessBasicData extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  public function_id!: string;

  @Prop({ required: true })
  public sub_function_id!: string;

  @Prop({ required: true })
  public title!: string;

  @Prop({ required: true })
  public version_type!: string;

  @Prop({ required: true })
  public version_id!: string;

  @Prop({ required: true })
  public sop_reference!: string;

  @Prop({ required: true })
  public owner_name!: string;

  @Prop({ required: true })
  public owner_role_designation!: string;

  @Prop({ required: true })
  public release_status!: string;

  @Prop({ required: true })
  public description!: string;

  @Prop({ required: true })
  public trigger!: string;

  @Prop({ required: true })
  created_by!: string;

  @Prop({ required: true, default: Date.now })
  created_on!: Date;

  @Prop()
  last_modified_by!: string;

  @Prop()
  last_modified_on!: Date;

  @Prop({ required: true, default: false })
  is_deleted!: boolean;

  @Prop({ type: IoInfo, required: true })
  public io_info!: IoInfo;

  @Prop({ type: [Activity], default: [] })
  public activities!: Activity[];

  @Prop({ type: ProcessControlAndMonitoring, required: false })
  public control_and_monitoring?: ProcessControlAndMonitoring;

  @Prop({ type: [QueriesAndResponses], default: [] })
  public queries_and_responses!: QueriesAndResponses[];

  @Prop({ type: DataManagementData, required: false })
  public data_management!: DataManagementData;

  @Prop({ type: IntegrationScenario, required: false })
  public integration_scenario!: IntegrationScenario;

  @Prop({ type: [ProcessDocument], default: [] })
  public documents!: ProcessDocument[];

  @Prop({ type: [AutomationScenario], default: [] })
  public automation_scenarios!: AutomationScenario[];

  @Prop({ type: ComplianceScenario, required: false })
  public compliance_scenarios!: ComplianceScenario;

  @Prop({ type: [ProcessControl], default: [] })
  public controls!: ProcessControl[];
}

export const ProcessBasicDataSchema = SchemaFactory.createForClass(ProcessBasicData);
