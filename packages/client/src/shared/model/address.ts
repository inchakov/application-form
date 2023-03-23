import { Type } from "@sinclair/typebox";

export const AddressSchema = Type.Object({
    street: Type.String({ minLength: 1 }),
    city: Type.String({ minLength: 1 }),
    state: Type.String({ minLength: 1 }),
    zip: Type.Number({ minLength: 1 }),
});