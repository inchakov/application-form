import { FastifyInstance } from "fastify";
import { Application, ApplicationSchema } from "../model/application"
import { ApplicationPriceSchema } from "../model/application-price"

export function useApplicationCalculatorApi(prefix: string, server: FastifyInstance) {
    
    server.post<{ Body: Application }>(prefix, {
        schema: {
            body: ApplicationSchema,
            response: {
                200: ApplicationPriceSchema,
            }
        }
    }, async (request) => {
        const application = request.body
        return { price: Math.round(Math.random() * 5000) }
    })
}