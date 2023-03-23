import fastify from 'fastify'
import fastifyStatic from "@fastify/static";
import { healthStatus } from './handlers/health-status'
import { applicationDataApi } from './handlers/application-data-api'
import { applicationCalculatorApi } from './handlers/application-calculator-api'
import path from 'path';

export async function createServer() {

    const server = fastify({
        logger: true
    });

    await server.register(healthStatus, { prefix: '/api/status' });
    await server.register(applicationDataApi, { prefix: '/api/application' });
    await server.register(applicationCalculatorApi, { prefix: '/api/application/calculate' });

    server.register(fastifyStatic, { root: path.join(__dirname, '../../client/build')})

    return server;
}
