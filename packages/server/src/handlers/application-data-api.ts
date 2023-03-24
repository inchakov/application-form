import { Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";
import { PartialApplication, PartialApplicationSchema } from "../../../client/src/shared/model/application";
import { ErrorMessageSchema } from "../../../client/src/shared/model/error-message";
import { ApplicationUid, ApplicationUidSchema } from "../../../client/src/shared/model/application-uid";
import { ApplicationRouteSchema, ApplicationRoute } from "../../../client/src/shared/model/application-route";
import { Config } from "../config";
import { useApplicationDataService } from "../hooks/use-application-data-service";


export const applicationDataApi: FastifyPluginAsync = async (server) => { 

    const { createApplication, getApplication, saveApplication } = useApplicationDataService()

    server.post<{ Body: PartialApplication }>('', {
        schema: {
            body: PartialApplicationSchema,
            response: {
                200: ApplicationRouteSchema
            }
        }
    }, async (request) => {
        const application: ApplicationUid = await createApplication(request.body)
        const response: ApplicationRoute = {
            applicationUid: application.applicationUid,
            resume: `${Config.root}/api/application/${application.applicationUid}`
        }
        return response
    })

    server.get<{ Params: ApplicationUid }>('/:applicationUid', {
        schema: {
            params: ApplicationUidSchema,
            response: {
                200: PartialApplicationSchema,
                404: ErrorMessageSchema
            }
        }
    }, async (request) => {
        const application: PartialApplication = await getApplication(request.params.applicationUid)
        return application
    })

    server.put<{
        Params: ApplicationUid,
        Body: PartialApplication
    }>('/:applicationUid', {
        schema: {
            params: ApplicationUidSchema,
            body: PartialApplicationSchema,
            response: {
                200: Type.Literal('OK'),
                404: ErrorMessageSchema
            }
        }
    }, async (request) => {
        await saveApplication(request.params.applicationUid, request.body)
        return 'OK'
    })
}