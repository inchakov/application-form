import { Config } from './config'
import { createServer } from './create-server'

async function start() {

    const server = await createServer();

    server.listen({ port: Config.port }, (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    })
}

start();
