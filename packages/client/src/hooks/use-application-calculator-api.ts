import { ApplicationCalculator, useApplicationCalculator } from "../shared/hooks/use-application-calculator"
import { ApplicationPrice } from "../shared/model/application-price";
import { ErrorMessage } from "../shared/model/error-message";

export const useApplicationCalculatorApi: useApplicationCalculator = () => {
    return applicationCalculatorApi
}

const applicationCalculatorApi: ApplicationCalculator = {

    calculatePrice: async (application) => {
        const response = await fetch("/api/application/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(application),
        });

        if (response.status === 400) {
            const error = await response.json() as ErrorMessage;
            console.log(error)
            throw new Error(`Price calculation failed: ${error.message}`);
        }

        if (response.ok === false) {
            throw new Error(`Price calculation failed: ${response.statusText}`);
        }

        return await response.json() as ApplicationPrice;
    }
}