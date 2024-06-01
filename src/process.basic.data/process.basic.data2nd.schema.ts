// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Schema as MongooseSchema } from 'mongoose';

// class Metadata {
//   @Prop({ required: true })
//   public description!: string;

//   @Prop({ required: true })
//   public trigger!: string;

//   @Prop({ required: true })
//   public inputs!: string;

//   @Prop({ required: true })
//   public outputs!: string;

//   @Prop({ required: true })
//   public business_outcome!: string;

//   @Prop({ required: true })
//   public major_requirements!: string;
// }

// @Schema({ collection: 'process_basic_data2' })
// export class ProcessBasicData extends Document {
//   @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
//   _id: MongooseSchema.Types.ObjectId;

//   @Prop({ required: true })
//   public sub_function_id!: string;

//   @Prop({ required: true })
//   public title!: string;

//   @Prop({ required: true })
//   public business_process_id!: string;

//   @Prop({ required: true })
//   public version_type!: string;

//   @Prop({ required: true })
//   public version_id!: string;

//   @Prop({ required: true })
//   public sop_reference!: string;

//   @Prop({ required: true })
//   public owner_name!: string;

//   @Prop({ required: true })
//   public owner_role_designation!: string;

//   @Prop({ required: true })
//   public release_status!: string;

//   @Prop({ required: true })
//   created_by!: string;

//   @Prop({ required: true })
//   created_on!: Date;

//   @Prop({ required: true })
//   last_modified_by!: string;

//   @Prop({ required: true })
//   last_modified_on!: Date;

//   @Prop({ required: true, unique: true })
//   public deleted!: boolean;


//   @Prop({ type: Metadata, required: true })
//   public basic_data!: Metadata;

//   @Prop({
//     type: [{
//       description: String,
//       performed_at: String,
//       performed_by: String,
//       performed_where: String,
//       value_calculation_logic: String,
//       accounts_postings: String,
//     }],
//     default: []
//   })
//   public activities!: {
//     description: string;
//     performed_at: string;
//     performed_by: string;
//     performed_where: string;
//     value_calculation_logic: String;
//     accounts_postings: String;
//   }[];

//   @Prop({
//     type: {
//       workflows: [{
//         title: String,
//         description: String,
//         technology: String,
//         levels: String,
//         roles: String,
//         // function_id: String,
//         // sub_function_id: String,
//         // business_process_id: String,
//         // activity_id: String,
//         // automation_id: String,
//         // integration_scenario_id: String
//       }],
//       kpis: [{
//         title: String,
//         description: String,
//         calculation_logic: String,
//         complexity_level: String,
//         type: String,
//         role: String,
//         // function_id: String,
//         // sub_function_id: String,
//         // business_process_id: String,
//         // activity_id: String,
//         // automation_id: String,
//         // integration_scenario_id: String
//       }],
//       reports: [{
//         title: String,
//         description: String,
//         attachments: String,
//         complexity_level: String,
//         type: String,
//         application: String,
//         source_data: String,
//         role: String,
//         // function_id: String,
//         // sub_function_id: String,
//         // business_process_id: String,
//         // activity_id: String,
//         // automation_id: String,
//         // integration_scenario_id: String
//       }],
//       analytical_dashboards: [{
//         title: String,
//         description: String,
//         attachments: String,
//         complexity_level: String,
//         type: String,
//         dashboard_application: String,
//         source_data: String,
//         role: String,
//         // function_id: String,
//         // sub_function_id: String,
//         // business_process_id: String,
//         // activity_id: String,
//         // automation_id: String,
//         // integration_scenario_id: String
//       }]
//     }
//   })
//   public process_control_and_monitoring?: {
//     workflows: {
//       title: string,
//       description: string,
//       technology: string,
//       levels: string,
//       roles: string,
//       // function_id: string,
//       // sub_function_id: string,
//       // business_process_id: string,
//       // activity_id: string,
//       // automation_id: string,
//       // integration_scenario_id: string
//     }[],
//     kpis: {
//       title: string,
//       description: string,
//       calculation_logic: string,
//       complexity_level: string,
//       type: string,
//       role: string,
//       // function_id: string,
//       // sub_function_id: string,
//       // business_process_id: string,
//       // activity_id: string,
//       // automation_id: string,
//       // integration_scenario_id: string
//     }[],
//     reports: {
//       title: string,
//       description: string,
//       attachments: string,
//       complexity_level: string,
//       type: string,
//       application: string,
//       source_data: string,
//       role: string,
//       // function_id: string,
//       // sub_function_id: string,
//       // business_process_id: string,
//       // activity_id: string,
//       // automation_id: string,
//       // integration_scenario_id: string
//     }[],
//     analytical_dashboards: {
//       title: string,
//       description: string,
//       attachments: string,
//       complexity_level: string,
//       type: string,
//       dashboard_application: string,
//       source_data: string,
//       role: string,
//       // function_id: string,
//       // sub_function_id: string,
//       // business_process_id: string,
//       // activity_id: string,
//       // automation_id: string,
//       // integration_scenario_id: string
//     }[]
//   };


//   @Prop({
//     type: [{
//       // function_id: String,
//       // sub_function_id: String,
//       // business_process_id: String,
//       // activity_id: String,
//       average_transactions: String,
//       maximum_transactions: String,
//       average_line_items: String,
//       data_security: String,
//       data_retention: String,
//       data_residency: String,
//     }],
//     default: []
//   })
//   public data_management!: {
//     // function_id: string,
//     // sub_function_id: string,
//     // business_process_id: string,
//     // activity_id: string,
//     average_transactions: string,
//     maximum_transactions: string,
//     average_line_items: string,
//     data_security: string,
//     data_retention: string,
//     data_residency: string,
//   }[];

//   @Prop({
//     type: [{
//       // integration_scenario_id: String,
//       title: String,
//       description: String,
//       data_provider: String,
//       data_consumer: String,
//       api_provider: String,
//       calling_system: String,
//       type: String,
//       mode: String,
//       data_type: String,
//       protocol: String,
//       tool: String,
//       data_record_size: String,
//       yoy_data_growth: String,
//       data_provider_authentication: String,
//       data_consumer_authentication: String,
//       // function_id: String,
//       // sub_function_id: String,
//       // business_process_id: String,
//       // activity_id: String,
//       // mdo_id: String
//     }],
//     default: []
//   })
//   public integration_scenarios!: {
//     // integration_scenario_id: string,
//     title: string,
//     description: string,
//     data_provider: string,
//     data_consumer: string,
//     api_provider: string,
//     calling_system: string,
//     type: string,
//     mode: string,
//     data_type: string,
//     protocol: string,
//     tool: string,
//     data_record_size: string,
//     yoy_data_growth: string,
//     data_provider_authentication: string,
//     data_consumer_authentication: string,
//     // function_id: string,
//     // sub_function_id: string,
//     // business_process_id: string,
//     // activity_id: string,
//     // mdo_id: string,
//   }[];

//   @Prop({
//     type: [{
//       // document_id: String,
//       title: String,
//       desc: String,
//       type: String,
//       source: String,
//       number_range: String,
//       storage_requirements: String,
//       attachments: String,
//       // function_id: String,
//       // sub_function_id: String,
//       // business_process_id: String,
//       // activity_id: String
//     }],
//     default: []
//   })
//   public process_documents!: {
//     // id: string,
//     title: string,
//     desc: string,
//     type: string,
//     source: string,
//     number_range: string,
//     storage_requirements: string,
//     attachments: string,
//     // function_id: string,
//     // sub_function_id: string,
//     // business_process_id: string,
//     // activity_id: string
//   }[];

//   @Prop({ type: [{ 
//     // automation_id: String,
//     type: String,
//     title: String,
//     desc: String,
//     technology: String,
//     // integration_scenario_id: String,
//     // function_id: String,
//     // sub_function_id: String,
//     // business_process_id: String,
//     // activity_id: String,
//     // mdo_id: String,
//     // created_by: String,
//     // created_on: Date,
//     // last_changed_by: String,
//     // last_changed_on: Date
//   }], default: [] })
//   public automation_scenarios!: {
//     // automation_id: String,
//     type: String,
//     title: String,
//     desc: String,
//     technology: String,
//     // integration_scenario_id: String,
//     // function_id: String,
//     // sub_function_id: String,
//     // business_process_id: String,
//     // activity_id: String,
//     // mdo_id: String,
//     // created_by: String,
//     // created_on: Date,
//     // last_changed_by: String,
//     // last_changed_on: Date
//   }[];


//   @Prop({ type: [{ 
//     // compliance_scenario_id: String,
//     title: String,
//     description: String,
//     attachments: String,
//     // function_id: String,
//     // sub_function_id: String,
//     // business_process_id: String,
//     // activity_id: String,
//     // automation_id: String,
//     // integration_scenario_id: String,
//     // created_by: String,
//     // created_on: Date,
//     // last_changed_by: String,
//     // last_changed_on: Date
//   }], default: [] })
//   public compliance_scenarios!: {
//     // compliance_scenario_id: String,
//     title: String,
//     description: String,
//     attachments: String,
//     // function_id: String,
//     // sub_function_id: String,
//     // business_process_id: String,
//     // activity_id: String,
//     // automation_id: String,
//     // integration_scenario_id: String,
//     // created_by: String,
//     // created_on: Date,
//     // last_changed_by: String,
//     // last_changed_on: Date,
//   }[];

//   @Prop({ type: [{ 
//     // control_id: String,
//     title: String,
//     description: String,
//     // function_id: String,
//     // sub_function_id: String,
//     // business_process_id: String,
//     // activity_id: String,
//     // mdo_id: String,
//     // created_by: String,
//     // created_on: Date,
//     // last_changed_by: String,
//     // last_changed_on: Date
//   }], default: [] })
//   public process_controls!: {
//     // control_id: String,
//     title: String,
//     description: String,
//     // function_id: String,
//     // sub_function_id: String,
//     // business_process_id: String,
//     // activity_id: String,
//     // mdo_id: String,
//     // created_by: String,
//     // created_on: Date,
//     // last_changed_by: String,
//     // last_changed_on: Date,
//   }[];
// }

// export const ProcessBasicDataSchema = SchemaFactory.createForClass(ProcessBasicData);


// // import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// // import { Document, Schema as MongooseSchema } from 'mongoose';

// // @Schema({ collection: 'process_basic_data' })
// // export class ProcessBasicData extends Document {
// //   @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
// //   _id: MongooseSchema.Types.ObjectId;

// //   @Prop({ required: true })
// //   public process_id!: string;

// //   @Prop({ required: true })
// //   public title!: string;

// //   // @Prop({ required: true, ref: () => dropDownMaster, type: () => [String] })
// //   // public versionTypeNumbers!: Ref<dropDownMaster>[];

// //   @Prop({ required: true })
// //   public sop_reference!: string;

// //   @Prop({ required: true })
// //   public process_owner_name!: string;

// //   @Prop({ required: true })
// //   public process_owner_role_designation!: string;

// //   @Prop({ required: true })
// //   public process_release_status!: string;

// //   @Prop({ required: true })
// //   public process_overview!: string;

// //   @Prop({ required: true })
// //   public process_trigger!: string;

// //   @Prop({ required: true })
// //   public inputs_to_the_process!: string;

// //   @Prop({ required: true })
// //   public outputs_of_the_process!: string;

// //   @Prop({ required: true })
// //   public business_outcome_of_the_process!: string;

// //   @Prop({ required: true })
// //   public major_requirements_of_the_process!: string;

// //   @Prop({ required: true, unique: true })
// //   public deleted!: boolean;

// //   @Prop({ required: true })
// //   public created_by!: string;

// //   @Prop({ required: true })
// //   public created_on!: Date;

// //   @Prop({ required: true })
// //   public last_changed_by!: string;

// //   @Prop({ required: true })
// //   public last_changed_on!: Date;

// //   @Prop({ type: [{ 
// //     activity_description: String,
// //     performed_at: String,
// //     performed_by: String,
// //     performed_where: String,
// //     deleted: Boolean,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }], default: [] })
// //   public activities!: {
// //     activity_description: string;
// //     performed_at: string;
// //     performed_by: string;
// //     performed_where: string;
// //     deleted: boolean;
// //     created_by: string;
// //     created_on: Date;
// //     last_changed_by: string;
// //     last_changed_on: Date;
// //   }[];

// //   @Prop({ type: {
// //     workflows: [{
// //       approval_workflow_scenario_id: String,
// //       approval_workflow_scenario_title: String,
// //       approval_workflow_scenario_desc: String,
// //       approval_workflow_scenario_tech: String,
// //       workflow_levels: String,
// //       workflow_roles: String,
// //       function_id: String,
// //       sub_function_id: String,
// //       business_process_id: String,
// //       activity_id: String,
// //       automation_id: String,
// //       integration_scenario_id: String,
// //       created_by: String,
// //       created_on: Date,
// //       last_changed_by: String,
// //       last_changed_on: Date
// //     }],
// //     kpis: [{
// //       kpi_id: String,
// //       kpi_title: String,
// //       kpi_desc: String,
// //       kpi_calculation_logic: String,
// //       kpi_complexity_level: String,
// //       kpi_type: String,
// //       role: String,
// //       function_id: String,
// //       sub_function_id: String,
// //       business_process_id: String,
// //       activity_id: String,
// //       automation_id: String,
// //       integration_scenario_id: String,
// //       created_by: String,
// //       created_on: Date,
// //       last_changed_by: String,
// //       last_changed_on: Date
// //     }],
// //     reports: [{
// //       report_id: String,
// //       report_title: String,
// //       report_desc: String,
// //       report_attachments: String,
// //       report_complexity_level: String,
// //       report_type: String,
// //       report_application: String,
// //       source_data: String,
// //       role: String,
// //       function_id: String,
// //       sub_function_id: String,
// //       business_process_id: String,
// //       activity_id: String,
// //       automation_id: String,
// //       integration_scenario_id: String,
// //       created_by: String,
// //       created_on: Date,
// //       last_changed_by: String,
// //       last_changed_on: Date
// //     }],
// //     analytical_dashboards: [{
// //       analytical_dashboard_id: String,
// //       analytical_dashboard_title: String,
// //       analytical_dashboard_desc: String,
// //       analytical_dashboard_attachments: String,
// //       analytical_dashboard_complexity_level: String,
// //       analytical_dashboard_type: String,
// //       dashboard_application: String,
// //       source_data: String,
// //       role: String,
// //       function_id: String,
// //       sub_function_id: String,
// //       business_process_id: String,
// //       activity_id: String,
// //       automation_id: String,
// //       integration_scenario_id: String,
// //       created_by: String,
// //       created_on: Date,
// //       last_changed_by: String,
// //       last_changed_on: Date
// //     }]
// //   } })
// //   public process_control_and_monitoring?: {
// //     workflows: {
// //       approval_workflow_scenario_id: string,
// //       approval_workflow_scenario_title: string,
// //       approval_workflow_scenario_desc: string,
// //       approval_workflow_scenario_tech: string,
// //       workflow_levels: string,
// //       workflow_roles: string,
// //       function_id: string,
// //       sub_function_id: string,
// //       business_process_id: string,
// //       activity_id: string,
// //       automation_id: string,
// //       integration_scenario_id: string,
// //       created_by: string,
// //       created_on: Date,
// //       last_changed_by: string,
// //       last_changed_on: Date
// //     }[],
// //     kpis: {
// //       kpi_id: string,
// //       kpi_title: string,
// //       kpi_desc: string,
// //       kpi_calculation_logic: string,
// //       kpi_complexity_level: string,
// //       kpi_type: string,
// //       role: string,
// //       function_id: string,
// //       sub_function_id: string,
// //       business_process_id: string,
// //       activity_id: string,
// //       automation_id: string,
// //       integration_scenario_id: string,
// //       created_by: string,
// //       created_on: Date,
// //       last_changed_by: string,
// //       last_changed_on: Date
// //     }[],
// //     reports: {
// //       report_id: string,
// //       report_title: string,
// //       report_desc: string,
// //       report_attachments: string,
// //       report_complexity_level: string,
// //       report_type: string,
// //       report_application: string,
// //       source_data: string,
// //       role: string,
// //       function_id: string,
// //       sub_function_id: string,
// //       business_process_id: string,
// //       activity_id: string,
// //       automation_id: string,
// //       integration_scenario_id: string,
// //       created_by: string,
// //       created_on: Date,
// //       last_changed_by: string,
// //       last_changed_on: Date
// //     }[],
// //     analytical_dashboards: {
// //       analytical_dashboard_id: string,
// //       analytical_dashboard_title: string,
// //       analytical_dashboard_desc: string,
// //       analytical_dashboard_attachments: string,
// //       analytical_dashboard_complexity_level: string,
// //       analytical_dashboard_type: string,
// //       dashboard_application: string,
// //       source_data: string,
// //       role: string,
// //       function_id: string,
// //       sub_function_id: string,
// //       business_process_id: string,
// //       activity_id: string,
// //       automation_id: string,
// //       integration_scenario_id: string,
// //       created_by: string,
// //       created_on: Date,
// //       last_changed_by: string,
// //       last_changed_on: Date
// //     }[]
// //   };
// //   @Prop({ type: [{ 
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     average_transactions: String,
// //     maximum_transactions: String,
// //     average_line_items: String,
// //     data_security: String,
// //     data_retention: String,
// //     data_residency: String,
// //     deleted: Boolean,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }], default: [] })
// //   public data_management!: {
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     average_transactions: String,
// //     maximum_transactions: String,
// //     average_line_items: String,
// //     data_security: String,
// //     data_retention: String,
// //     data_residency: String,
// //     deleted: Boolean,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }[];

// //   @Prop({ type: [{ 
// //     integration_scenario_id: String,
// //     integration_scenario_title: String,
// //     integration_scenario_desc: String,
// //     data_provider: String,
// //     data_consumer: String,
// //     api_provider: String,
// //     calling_system: String,
// //     integration_type: String,
// //     integration_mode: String,
// //     integration_data_type: String,
// //     integration_protocol: String,
// //     integration_tool: String,
// //     data_record_size: String,
// //     yoy_data_growth: String,
// //     data_provider_authentication: String,
// //     data_consumer_authentication: String,
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     mdo_id: String,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }], default: [] })
// //   public integration_scenarios!: {
// //     integration_scenario_id: String,
// //     integration_scenario_title: String,
// //     integration_scenario_desc: String,
// //     data_provider: String,
// //     data_consumer: String,
// //     api_provider: String,
// //     calling_system: String,
// //     integration_type: String,
// //     integration_mode: String,
// //     integration_data_type: String,
// //     integration_protocol: String,
// //     integration_tool: String,
// //     data_record_size: String,
// //     yoy_data_growth: String,
// //     data_provider_authentication: String,
// //     data_consumer_authentication: String,
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     mdo_id: String,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }[];

// //   @Prop({ type: [{ 
// //     document_id: String,
// //     document_title: String,
// //     document_desc: String,
// //     document_type: String,
// //     document_source: String,
// //     document_number_range: String,
// //     storage_requirements: String,
// //     attachments: String,
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }], default: [] })
// //   public process_documents!: {
// //     document_id: String,
// //     document_title: String,
// //     document_desc: String,
// //     document_type: String,
// //     document_source: String,
// //     document_number_range: String,
// //     storage_requirements: String,
// //     attachments: String,
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }[];

// //   @Prop({ type: [{ 
// //     automation_id: String,
// //     automation_type: String,
// //     automation_title: String,
// //     automation_desc: String,
// //     automation_technology: String,
// //     integration_scenario: String,
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     mdo_id: String,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }], default: [] })
// //   public automation_scenarios!: {
// //     automation_id: String,
// //     automation_type: String,
// //     automation_title: String,
// //     automation_desc: String,
// //     automation_technology: String,
// //     integration_scenario: String,
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     mdo_id: String,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }[];

// //   @Prop({ type: [{ 
// //     compliance_scenario_id: String,
// //     compliance_scenario_title: String,
// //     compliance_scenario_desc: String,
// //     attachments: String,
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     automation_id: String,
// //     integration_scenario_id: String,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }], default: [] })
// //   public compliance_scenarios!: {
// //     compliance_scenario_id: String,
// //     compliance_scenario_title: String,
// //     compliance_scenario_desc: String,
// //     attachments: String,
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     automation_id: String,
// //     integration_scenario_id: String,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }[];

// //   @Prop({ type: [{ 
// //     control_id: String,
// //     control_title: String,
// //     control_desc: String,
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     mdo_id: String,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }], default: [] })
// //   public process_controls!: {
// //     control_id: String,
// //     control_title: String,
// //     control_desc: String,
// //     function_id: String,
// //     sub_function_id: String,
// //     business_process_id: String,
// //     activity_id: String,
// //     mdo_id: String,
// //     created_by: String,
// //     created_on: Date,
// //     last_changed_by: String,
// //     last_changed_on: Date
// //   }[];
// // }

// // export const ProcessBasicDataSchema = SchemaFactory.createForClass(ProcessBasicData);

