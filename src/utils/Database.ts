import { MongoClient } from "mongodb";
import config from "../../config";

class Database {
  private uri: string;
  private client: any;
  private db: any;

  public constructor() {
    this.uri = config.mongoURI;
    this.init();
  }

  public async init() {
    if (!this.client) {
      this.client = await MongoClient.connect(this.uri, {
        useNewUrlParser: true
      });
      this.db = this.client.db("url");
      return this.client;
    } else {
      return this.client;
    }
  }

  public async increment(instance: string, botid: string): Promise<boolean> {
    let bkl;
    let instances: number = 0;
    try {
      const doc = await (this.db as any)
        .collection("instances")
        .findOne({ id: 0 });
      if (
        doc !== null &&
        doc.data[instance] &&
        (doc.data[instance].instances !== null ||
          doc.data[instance].botID !== null)
      ) {
        if (doc.data[instance].botID.includes(botid)) {
          return true;
        }
        if (typeof doc.data[instance].botID === "object") {
          bkl = doc.data[instance].botID;
        }
        instances = doc.data[instance].instances;
      } else {
        bkl = [];
      }
      bkl.push(botid);
      const $query: any = doc.data ? doc.data : {};
      $query[instance] = { instances: instances + 1, botID: bkl };
      await (this.db as any).collection("instances").findOneAndUpdate(
        { id: 0 },
        {
          $set: {
            data: $query
          }
        },
        { upsert: true }
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public async get(instance: string): Promise<number> {
    try {
      const doc = await (this.db as any)
        .collection("instances")
        .findOne({ id: 0 });
      if (
        doc === null || !doc[instance] ||
        doc.data[instance].instances === null ||
        doc.data[instance].botID === null
      ) {
        return 0;
      }
      return doc.data[instance].instances;
    } catch (err) {
      console.error(err);
      return -1;
    }
  }
}

export const db = new Database();
