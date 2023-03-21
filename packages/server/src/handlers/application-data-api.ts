import { Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";
import { useApplicationDataRepository } from "../hooks/use-application-data-repository";
import { PartialApplication, PartialApplicationSchema } from "../../../client/src/shared/model/application";
import { ErrorMessageSchema } from "../../../client/src/shared/model/error-message";
import { ApplicationUid, ApplicationUidSchema } from "../../../client/src/shared/model/application-uid";
import { ApplicationRouteSchema, ApplicationRoute } from "../../../client/src/shared/model/application-route";
import { Config } from "../config";


export const applicationDataApi: FastifyPluginAsync = async (server) => { 

    const { createApplication, getApplication, saveApplication } = useApplicationDataRepository()

    server.post<{ Body: PartialApplication }>('', {
        schema: {
            body: PartialApplicationSchema,
            response: {
                200: ApplicationRouteSchema
            }
        }
    }, async (request, reply) => {
        const applicationUid: string = await createApplication(request.body)
        const response: ApplicationRoute = {
            uid: applicationUid,
            uri: `${Config.root}/api/application/${applicationUid}`
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
        saveApplication(request.params.applicationUid, request.body)
        return 'OK'
    })
}