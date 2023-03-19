import { Type } from "@sinclair/typebox";

export const AddressSchema = Type.Object({
    street: Type.String(),
    city: Type.String(),
    state: Type.String(),
    zip: Type.Number(),
});