import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
    port: Number(process.env.PORT) || 8080,
    dbPath: process.env.DBPATH || 'data.db'
}
