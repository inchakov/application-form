import { Type } from "@sinclair/typebox";
import { PersonSchema } from "./person";

export const AdditionalPersonSchema = Type.Intersect([
    PersonSchema,
    Type.Object({
        relationship: Type.Union([
            Type.Literal('Spouse'),
            Type.Literal('Child'),
            Type.Literal('Sibling'),
            Type.Literal('Parent'),
            Type.Literal('Friend'),
            Type.Literal('Other'),
        ])
    })
]);
