import { Type } from "@sinclair/typebox";

export const MinVehicleYear = 1985;

export const VehicleSchema = Type.Object({
    vin: Type.String({ pattern: '^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{17}$' }),
    year: Type.Number({ minimum: MinVehicleYear }),
    make: Type.String({ minLength: 1 }),
    model: Type.String({ minLength: 1 }),
});