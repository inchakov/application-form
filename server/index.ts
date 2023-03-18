import fastify from 'fastify'
import { Config } from './config'

const server = fastify()

server.get('/health-status', async (request, reply) => {
    return {
        status: 'OK',
        version: process.env.npm_package_version
    }
})

server.listen({ port: Config.port }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})