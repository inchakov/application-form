import { ApplicationData, useApplicationData } from "../shared/hooks/use-application-data";
import { PartialApplication } from "../shared/model/application";
import { ApplicationUid } from "../shared/model/application-uid";

export const useApplicationDataApi: useApplicationData = () => {
    return applicationDataApi
}

const applicationDataApi: ApplicationData = {

    createApplication: async (initialData: PartialApplication): Promise<ApplicationUid> => {
        const response = await fetch("/api/application", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(initialData),
        });
        if (response.ok === false) {
            throw new Error(`Application creating failed: ${response.statusText}`);
        }
        return response.json() as unknown as ApplicationUid;
    },

    getApplication: async (applicationId: string): Promise<PartialApplication> => {
        const response = await fetch(`/api/application/${applicationId}`);
        if (response.ok === false) {
            throw new Error(`Application load failed: ${response.statusText}`);
        }
        return response.json() as unknown as PartialApplication;
    },

    saveApplication: async (applicationId: string, data: PartialApplication): Promise<void> => {
        const response = await fetch(`/api/application/${applicationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok === false) {
            throw new Error(`Application saving failed: ${response.statusText}`);
        }
    }
} as const