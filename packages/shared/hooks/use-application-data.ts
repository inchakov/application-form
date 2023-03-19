import { PartialApplication } from "../model/application";

export interface ApplicationData {
    createApplication(initialData?: PartialApplication | null): PromiseLike<string>
    getApplication(applicationId: string): PromiseLike<PartialApplication>
    saveApplication(applicationId: string, data: PartialApplication): PromiseLike<void>
}

export type useApplicationData = () => ApplicationData