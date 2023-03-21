import { Static, Type } from "@sinclair/typebox";

export type ApplicationRoute = Static<typeof ApplicationRouteSchema>
export const ApplicationRouteSchema = Type.Object({
    uid: Type.String({ format: 'uuid' }),
    uri: Type.String({ format: 'uri' })
})