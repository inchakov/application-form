import { PartialApplication } from "../model/application";
import { ApplicationUid } from "../model/application-uid";

export interface ApplicationData {
    createApplication(initialData?: PartialApplication | null): Promise<ApplicationUid>
    getApplication(applicationId: string): Promise<PartialApplication>
    saveApplication(applicationId: string, data: PartialApplication): Promise<void>
}

export type useApplicationData = () => ApplicationData
