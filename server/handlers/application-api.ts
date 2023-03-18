import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { Application, ApplicationSchema, PartialApplication, PartialApplicationSchema } from "../model/application";
import { ApplicationPriceSchema } from "../model/application-price";
import { ErrorMessageSchema } from "../model/error-message";
import { Uid, UidSchema } from "../model/uid";

export function useApplicationApi(prefix: string, server: FastifyInstance) {

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

    server.post<{ Body: Application }>(`${prefix}/calculate`, {
        schema: {
            body: ApplicationSchema,
            response: {
                200: ApplicationPriceSchema,
            }
        }
    }, async (request) => {
        const application = request.body
        return { price: Math.round(Math.random()*5000) }
    })
}