import { FastifyInstance } from "fastify";


export function register(prefix: string, server: FastifyInstance) {

    server.get(`${prefix}`, async () => {
        return {
            status: 'OK',
            version: process.env.npm_package_version
        }
    })
}
