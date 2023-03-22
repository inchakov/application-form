import { ApplicationCalculator, useApplicationCalculator } from "../../../client/src/shared/hooks/use-application-calculator";


export const useApplicationCalculatorService: useApplicationCalculator = () => {
    return applicationCalculatorService
}

const applicationCalculatorService: ApplicationCalculator = {
    calculatePrice: async () => {
        return { price: Math.round(Math.random() * 5000) }
    }
}