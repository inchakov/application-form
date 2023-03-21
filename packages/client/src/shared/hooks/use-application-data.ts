import { PartialApplication } from "../model/application";
import { ApplicationUid } from "../model/application-uid";

export interface ApplicationData {
    createApplication(initialData?: PartialApplication | null): PromiseLike<ApplicationUid>
    getApplication(applicationId: string): PromiseLike<PartialApplication>
    saveApplication(applicationId: string, data: PartialApplication): PromiseLike<void>
}

export type useApplicationData = () => ApplicationData
