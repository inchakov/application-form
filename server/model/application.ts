import { Static, TObject, Type } from "@sinclair/typebox";

export const MaxVehicles = 3;

export const PersonSchema = Type.Object({
    firstName: Type.String(),
    lastName: Type.String(),
    dateOfBirth: Type.String({ format: 'date' }),
})

export const AddressSchema = Type.Object({
    street: Type.String(),
    city: Type.String(),
    state: Type.String(),
    zip: Type.Number(),
});

export const VehicleSchema = Type.Object({
    vin: Type.String(),
    year: Type.Number({ minimum: 1985 }),
    make: Type.String(),
    model: Type.String(),
});

export type Application = Static<typeof ApplicationSchema>;
export const ApplicationSchema = Type.Intersect([
    PersonSchema,
    AddressSchema,
    Type.Object({
        vehicles: Type.Array(VehicleSchema, { minItems: 1, maxItems: MaxVehicles }),
    })
])

export type PartialApplication = Partial<Application>;
export const PartialApplicationSchema = {
    ...PartialSchema(ApplicationSchema),
    vehicles: Type.Array(
        PartialSchema(VehicleSchema),
        { minItems: 0, maxItems: MaxVehicles }
    ),
}

function PartialSchema(schema: TObject) {
    return {
        ...schema,
        required: []
    }
}