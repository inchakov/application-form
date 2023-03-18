import { Type, Static } from "@sinclair/typebox";

export type ApplicationPrice = Static<typeof ApplicationPriceSchema>;
export const ApplicationPriceSchema = Type.Object({
    price: Type.Number({ minimum: 0 }),
})
