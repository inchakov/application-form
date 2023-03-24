import { Static, Type } from "@sinclair/typebox";

export type ApplicationRoute = Static<typeof ApplicationRouteSchema>
export const ApplicationRouteSchema = Type.Object({
    applicationUid: Type.String({ format: 'uuid' }),
    resume: Type.String({ format: 'uri' })
})