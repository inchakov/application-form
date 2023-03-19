import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { PartialApplication } from "../model/application";

@Entity("AP_Application")
export class Application {

    @PrimaryColumn()
    uid!: string;

    @CreateDateColumn()
    createdOn!: Date;

    @UpdateDateColumn()
    updatedOn?: Date;

    @DeleteDateColumn()
    deletedOn?: Date

    @Column('simple-json')
    application!: PartialApplication;
}