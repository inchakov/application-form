import { Type } from "@sinclair/typebox";

export const PersonSchema = Type.Object({
    firstName: Type.String({ minLength: 1 }),
    lastName: Type.String({ minLength: 1 }),
    dateOfBirth: Type.String({ format: "date" }),
})