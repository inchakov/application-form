import { Type } from "@sinclair/typebox";
import { FastifyPluginAsync } from "fastify";
import { useApplicationDataRepository } from "../hooks/use-application-data-repository";
import { PartialApplication, PartialApplicationSchema } from "../../../common/model/application";
import { ErrorMessageSchema } from "../../../common/model/error-message";
import { Uid, UidSchema } from "../../../common/model/uid";

export const applicationDataApi: FastifyPluginAsync = async (server) => { 

    const { createApplication, getApplication, saveApplication } = useApplicationDataRepository()

    server.post<{ Body: PartialApplication }>('', {
        schema: {
            body: PartialApplicationSchema
        }
    }, async (request, reply) => {
        const applicationUid: string = await createApplication(request.body)
        reply.redirect(`/app/${applicationUid}`)
    })

    server.get<{ Params: Uid }>('/:uid', {
        schema: {
            params: UidSchema,
            response: {
                200: PartialApplicationSchema,
                404: ErrorMessageSchema
            }
        }
    }, async (request) => {
        const application: PartialApplication = await getApplication(request.params.uid)
        return application
    })

    server.put<{
        Params: Uid,
        Body: PartialApplication
    }>('/:uid', {
        schema: {
            params: UidSchema,
            body: PartialApplicationSchema,
            response: {
                200: Type.Literal('OK'),
                404: ErrorMessageSchema
            }
        }
    }, async (request) => {
        saveApplication(request.params.uid, request.body)
        return 'OK'
    })
}