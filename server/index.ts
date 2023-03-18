import fastify from 'fastify'
import { Config } from './config'
import { useHealthStatus } from './handlers/health-status'
import { useApplicationApi } from './handlers/application-api'


const server = fastify()

useHealthStatus('/health-status', server)
useApplicationApi('/api/application', server)

server.listen({ port: Config.port }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})