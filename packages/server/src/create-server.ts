import fastify, { FastifyInstance } from 'fastify'
import fastifyStatic from "@fastify/static";
import { healthStatus } from './handlers/health-status'
import { applicationDataApi } from './handlers/application-data-api'
import { applicationCalculatorApi } from './handlers/application-calculator-api'
import path from 'path';

export async function createServer() {

    const server = fastify({
        logger: true
    });

    await registerApiRoutings(server);

    await registerStaticRoutings(server);

    return server;
}

async function registerApiRoutings(server: FastifyInstance) {
    await server.register(healthStatus, { prefix: '/api/status' });
    await server.register(applicationDataApi, { prefix: '/api/application' });
    await server.register(applicationCalculatorApi, { prefix: '/api/application/calculate' });
}

async function registerStaticRoutings(server: FastifyInstance) {
    await server.register(fastifyStatic, {
        prefix: '/',
        root: path.join(__dirname, '../../client/build')
    });
}