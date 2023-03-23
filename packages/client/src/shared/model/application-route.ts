import { Static, Type } from "@sinclair/typebox";

export type ApplicationRoute = Static<typeof ApplicationRouteSchema>
export const ApplicationRouteSchema = Type.Object({
    applicationUid: Type.String({ format: 'uuid' }),
    resumeUrl: Type.String({ format: 'uri' })
})