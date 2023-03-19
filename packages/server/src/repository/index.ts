import "reflect-metadata"
import { DataSource } from "typeorm";
import { Config } from "../config";
import { ApplicationEntity } from "./application-entity";

const dataSource = new DataSource({
    type: 'sqlite',
    database: Config.dbPath,
    entities: [ApplicationEntity],
    logging: true,
    synchronize: true,
})

const applicationRepository = dataSource.getRepository(ApplicationEntity)

let dataSourceInitialized = false

export async function getRepositories() {

    if (!dataSourceInitialized) {
        await dataSource.initialize();
        dataSourceInitialized = true;
    }
    
    return {
        applicationRepository
    }
}
