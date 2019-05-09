import { ObjectId } from "bson";
import IDB from "./IDB";

export interface IRDB extends IDB {
    _id: ObjectId;
    __v: number;
}
