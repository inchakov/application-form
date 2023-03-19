import { Type, Static } from "@sinclair/typebox";

export type ErrorMessage = Static<typeof ErrorMessageSchema>;
export const ErrorMessageSchema = Type.Object({
    message: Type.String(),
})