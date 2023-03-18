import { Type } from "@sinclair/typebox";

export const PersonSchema = Type.Object({
    firstName: Type.String(),
    lastName: Type.String(),
    dateOfBirth: Type.String({ format: 'date' }),
})