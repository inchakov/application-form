import fastify from 'fastify'
import { Config } from './config'
import { useHealthStatus } from './handlers/health-status'
import { useApplicationDataApi } from './handlers/application-data-api'
import { useApplicationCalculatorApi } from './handlers/application-calculator-api'


const server = fastify()

useHealthStatus('api/health-status', server)
useApplicationDataApi('/api/application', server)
useApplicationCalculatorApi('/api/application/calculate', server)

server.listen({ port: Config.port }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})