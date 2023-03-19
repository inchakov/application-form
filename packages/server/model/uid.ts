import { Static, Type } from "@sinclair/typebox";

export type Uid = Static<typeof UidSchema>
export const UidSchema = Type.Object({
    uid: Type.String({ minLength: 1, maxLength: 36 })
})
