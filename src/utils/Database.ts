// tslint:disable-next-line: ordered-imports
import { connect, Schema, Model, model } from "mongoose";
import config from "../../config";
import IDB from "../interfaces/IDB";

connect(config.mongoURI, { useNewUrlParser: true });

const InstanceSchema = new Schema({
    data: {
        announcement: {
            botID: Array,
            instances: { type: Number, default: 0 },
        },
        backupdb: {
            botID: Array,
            instances: { type: Number, default: 0 },
        },
        dmonjoin: {
            botID: Array,
            instances: { type: Number, default: 0 },
        },
        hastebin: {
            botID: Array,
            instances: { type: Number, default: 0 },
        },
        leaveserver: {
            botID: Array,
            instances: { type: Number, default: 0 },
        },
        moderation: {
            botID: Array,
            instances: { type: Number, default: 0 },
        },
        reacttocontact: {
            botID: Array,
            instances: { type: Number, default: 0 },
        },
        tags: {
            botID: Array,
            instances: { type: Number, default: 0 },
        },
        translator: {
            botID: Array,
            instances: { type: Number, default: 0 },
        },
    },
    id: Number,
});

export const db: Model<IDB> = model<IDB>("instances", InstanceSchema);
