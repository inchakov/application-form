import fastify from 'fastify'
import { healthStatus } from './handlers/health-status'
import { applicationDataApi } from './handlers/application-data-api'
import { applicationCalculatorApi } from './handlers/application-calculator-api'


export async function createServer() {

    const server = fastify();

    await server.register(healthStatus, { prefix: '/api/status' });
    await server.register(applicationDataApi, { prefix: '/api/application' });
    await server.register(applicationCalculatorApi, { prefix: '/api/application/calculate' });

    return server;
}
