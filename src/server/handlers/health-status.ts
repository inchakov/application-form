import { FastifyPluginAsync } from "fastify";

export const healthStatus: FastifyPluginAsync = async (server) => { 

    server.get('', async () => {
        return {
            status: 'OK',
            version: process.env.npm_package_version
        }
    })
}
