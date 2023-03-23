import { FastifyPluginAsync } from "fastify";
import { Application, ApplicationSchema } from "../../../client/src/shared/model//application"
import { ApplicationPriceSchema } from "../../../client/src/shared/model/application-price"
import { ErrorMessageSchema } from "../../../client/src/shared/model/error-message";
import { useApplicationCalculatorService } from "../hooks/use-application-calculator-service";

export const applicationCalculatorApi: FastifyPluginAsync = async (server) => { 

    const { calculatePrice } = useApplicationCalculatorService()
    
    server.post<{ Body: Application }>('', {
        schema: {
            body: ApplicationSchema,
            response: {
                200: ApplicationPriceSchema,
                400: ErrorMessageSchema
            }
        }
    }, async (request) => {
        const result = await calculatePrice(request.body)
        return { price: result.price }
    })
}