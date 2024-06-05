import { ProcessBasicDataRepository } from "./process.basic.data.repository";
import { ActivityDto } from "src/dto/process.dto";
export declare class ProcessActivityService {
    private readonly processBasicDataRepository;
    constructor(processBasicDataRepository: ProcessBasicDataRepository);
    updateActivity(processId: string, activityId: string, activityDto: ActivityDto): Promise<any>;
    updateActivityIsDeleted(processId: string, activityId: string): Promise<any>;
    updateActivityIsSoftDeleted(processId: string, activityId: string): Promise<any>;
    addActivity(processId: string, activityDto: ActivityDto): Promise<any>;
}
