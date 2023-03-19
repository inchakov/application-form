import { DataSource } from "typeorm";
import { Application } from "./application-entity";

const dataSource = new DataSource({
    type: 'sqlite',
    database: 'data.db'
})

const applicationRepository = dataSource.getRepository(Application)

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