import { Type } from "@sinclair/typebox";

export const VehicleSchema = Type.Object({
    vin: Type.String(),
    year: Type.Number({ minimum: 1985 }),
    make: Type.String(),
    model: Type.String(),
});