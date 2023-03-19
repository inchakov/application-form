import { PartialApplication } from "../../../common/model/application";
import { getRepositories as useRepositories } from "../repository";
import { useApplicationData } from "../../../common/hooks/use-application-data";
import { v4 as uuid } from "uuid";
import { NotFound } from "http-errors";

export const useApplicationDataRepository: useApplicationData = () => {

    return {
        createApplication: async (initialData?: PartialApplication | null) => {
            const { applicationRepository } = await useRepositories();
            const application = applicationRepository.create({
                uid: uuid(),
                application: initialData ?? {}
            });
            const result = await applicationRepository.insert(application)
            return result.identifiers[0].uid
        },

        getApplication: async (applicationId: string) => {
            const { applicationRepository } = await useRepositories();
            const record = await applicationRepository.findOneBy({ uid: applicationId })
            if (!record) {
                throw new NotFound(`Application '${applicationId}' not found`)
            }
            return record.application
        },

        saveApplication: async (applicationId: string, data: PartialApplication) => {
            const { applicationRepository } = await useRepositories();
            const record = await applicationRepository.findOneBy({ uid: applicationId })
            if (!record) {
                throw new NotFound(`Application '${applicationId}' not found`)
            }
            record.application = data
            await applicationRepository.save(record)
        }
    }
}