import { Document } from "mongoose";


export default interface IDB extends Document {
    id: number;
    data: {
        "tags": {
            "botID": string[],
            "instances": number,
        },
        "announcement": {
            "botID": string[],
            "instances": number,
        },
        "dmonjoin": {
            "botID": string[],
            "instances": number,
        },
        "hastebin": {
            "botID": string[],
            "instances": number,
        },
        "leaveserver": {
            "botID": string[],
            "instances": number,
        },
        "translator": {
            "botID": string[],
            "instances": number,
        },
    };
}
