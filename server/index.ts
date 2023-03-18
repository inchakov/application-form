import fastify from 'fastify'
import { Config } from './config'
import { register as registerHealthStatus } from './handlers/health-status'

const server = fastify()

registerHealthStatus('/health-status', server)

server.listen({ port: Config.port }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})