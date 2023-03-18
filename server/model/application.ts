import { Static, TObject, Type } from "@sinclair/typebox";
import { PersonSchema } from "./person";
import { AddressSchema } from "./address";
import { VehicleSchema } from "./vehicle";
import { AdditionalPersonSchema } from "./additional-person";


export const MaxVehicles = 3;
export const MaxPeople = 3;


export type Application = Static<typeof ApplicationSchema>;
export const ApplicationSchema = Type.Intersect([
    PersonSchema,
    AddressSchema,
    Type.Object({
        vehicles: Type.Array(VehicleSchema, { minItems: 1, maxItems: MaxVehicles }),
        additionalPeople: Type.Array(AdditionalPersonSchema, { minItems: 0, maxItems: MaxPeople }),
    })
])

export type PartialApplication = Static<typeof PartialApplicationSchema>;
export const PartialApplicationSchema = Type.Partial(
    Type.Intersect([
        PersonSchema,
        AddressSchema,
        Type.Partial(
            Type.Object({
                vehicles: Type.Array(VehicleSchema, { minItems: 1, maxItems: MaxVehicles }),
                additionalPeople: Type.Array(AdditionalPersonSchema, { minItems: 0, maxItems: MaxPeople }),
            }
        ))
    ])
)
