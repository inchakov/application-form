import fastify from 'fastify'
import fastifyStatic from "@fastify/static";
import { healthStatus } from './handlers/health-status'
import { applicationDataApi } from './handlers/application-data-api'
import { applicationCalculatorApi } from './handlers/application-calculator-api'

export async function createServer() {

    const server = fastify();

    await server.register(healthStatus, { prefix: '/api/status' });
    await server.register(applicationDataApi, { prefix: '/api/application' });
    await server.register(applicationCalculatorApi, { prefix: '/api/application/calculate' });

    server.register((server) => {
        server.get('/bundle.js', (_, reply) => {
            reply.sendFile('./dist/client/bundle.js');
        })
    });

    server.register((server) => {
        server.get('/', (_, reply) => {
            // TODO Create db record and redirect to the new application
            const applicationId = '123'
            reply.redirect(`/${applicationId}`)
        })
    });

    server.register((server) => {
        server.get('/:applicationId', (request, reply) => {
            reply.sendFile('./dist/client/index.html');
        })
    });

    server.register(fastifyStatic, { root: './dist/client' })

    return server;
}
