import { ApplicationCalculator, useApplicationCalculator } from "../../../client/src/shared/hooks/use-application-calculator";
import { getMinDateOfBirth, MinDriverAge } from "../../../client/src/shared/model/application";
import { BadRequest } from "http-errors";


export const useApplicationCalculatorService: useApplicationCalculator = () => {
    return applicationCalculatorService
}

const applicationCalculatorService: ApplicationCalculator = {

    calculatePrice: async (application) => {

        // application validate by json schema.
        // Here we just need to validate things that cannot be validate by schema: age, etc.
        
        const minDateOfBirth = getMinDateOfBirth()

        if (new Date(application.dateOfBirth) > minDateOfBirth) {
            throw new BadRequest(`All drivers must be at least ${MinDriverAge} years old`)
        }

        if (application.additionalPeople) {
            for (const driver of application.additionalPeople) {
                if (new Date(driver.dateOfBirth) > minDateOfBirth) {
                    throw new BadRequest(`All drivers must be at least ${MinDriverAge} years old`)
                }
            }
        }

        return { price: Math.round(Math.random() * 5000) }
    }
}
