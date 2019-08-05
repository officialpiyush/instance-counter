import { json } from "body-parser";
import { Router } from "express";
import fetch, { Response } from "node-fetch";
import config from "../../config";
import { db } from "../utils/Database";

const APIRoute = Router();

APIRoute.use(json());

// tslint:disable-next-line: max-line-length
let aPlugins: any = fetch(config.pluginsJSON,
)
  .then((res: Response) => res.json())
  .then((j: JSON | any) => j.allowed);

async function resolvePlugin() {
  aPlugins = await aPlugins;
}

resolvePlugin();

APIRoute.post(
  "/instances/:ist",
  async (req, res): Promise<any> => {
    const ist: string = (req as any).params.ist;
    const id = (req as any).body.id;
    if (!id) {
      return res.json({ sucess: false });
    }
    if (!aPlugins.includes(ist)) {
      return res.json({ sucess: false });
    }
    const r = await db.increment(ist, id);
    if (r === true) {
      return res.json({ success: true });
    } else {
      return res.json({ sucess: false });
    }
  },
);

export = APIRoute;
