import { FastifyPluginAsync } from "fastify";
import { Application, ApplicationSchema } from "../../../client/src/shared/model//application"
import { ApplicationPriceSchema } from "../../../client/src/shared/model/application-price"

export const applicationCalculatorApi: FastifyPluginAsync = async (server) => { 
    
    server.post<{ Body: Application }>('', {
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