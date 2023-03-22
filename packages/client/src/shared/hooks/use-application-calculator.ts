import { Application } from "../model/application"
import { ApplicationPrice } from "../model/application-price"

export type ApplicationCalculator = {
    calculatePrice(application: Application): PromiseLike<ApplicationPrice>
}

export type useApplicationCalculator = () => ApplicationCalculator