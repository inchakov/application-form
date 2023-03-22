import { ApplicationCalculator, useApplicationCalculator } from "../shared/hooks/use-application-calculator"
import { ApplicationPrice } from "../shared/model/application-price";

export const useApplicationCalculatorApi: useApplicationCalculator = () => {
    return applicationCalculatorApi
}

const applicationCalculatorApi: ApplicationCalculator = {
    calculatePrice: async (application) => {
        const response = await fetch("/api/application/calculator", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(application),
        });
        return response.json() as unknown as ApplicationPrice;
    }
}