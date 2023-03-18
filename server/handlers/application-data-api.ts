import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { PartialApplication, PartialApplicationSchema } from "../model/application";
import { ErrorMessageSchema } from "../model/error-message";
import { Uid, UidSchema } from "../model/uid";

export function useApplicationDataApi(prefix: string, server: FastifyInstance) {

    server.post<{ Body: PartialApplication }>(`${prefix}`, {
        schema: {
            body: PartialApplicationSchema
        }
    }, async (request, reply) => {
        // TODO Create db record and redirect to the new application
        const applicationUid = '123'
        reply.redirect(`/app/${applicationUid}`)
    })

    server.get<{ Params: Uid }>(`${prefix}/:uid`, {
        schema: {
            params: UidSchema,
            response: {
                200: PartialApplicationSchema,
                404: ErrorMessageSchema
            }
        }
    }, async (request) => {
        // TODO Get db record
        return { firstName: 'John', lastName: 'Doe' }
    })

    server.put<{
        Params: Uid,
        Body: PartialApplication
    }>(`${prefix}/:uid`, {
        schema: {
            params: UidSchema,
            body: PartialApplicationSchema,
            response: {
                200: Type.Literal('OK'),
                404: ErrorMessageSchema
            }
        }
    }, async (request, reply) => {
        // TODO Update db record
        return 'OK'
    })
}