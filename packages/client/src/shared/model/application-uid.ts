import { Static, Type } from "@sinclair/typebox";

export type ApplicationUid = Static<typeof ApplicationUidSchema>
export const ApplicationUidSchema = Type.Object({
    applicationUid: Type.String({ format: 'uuid' })
})
