import { json } from "body-parser";
import { Router } from "express";
import fetch, { Response } from "node-fetch";
import { IRDB } from "../interfaces/IRDB";
import { db } from "../utils/Database";

const APIRoute = Router();

APIRoute.use(json());

// tslint:disable-next-line: max-line-length
const aPlugins: any = fetch("https://raw.githubusercontent.com/officialpiyush/modmail-plugins/master/plugins.json")
    .then((res: Response) => res.json())
    .then((j: JSON | any) => j.allowed);

APIRoute.post("/instances/:ist", async (req, res): Promise<any> => {
    const ist: string = (req as any).params.ist;
    const id = (req as any).body.id;
    if (!id) { return res.json({ sucess: false }); }
    if (!aPlugins.incudes(ist)) { return res.json({ sucess: false }); }
    db.findOne({ id: 0 }, async (err, info: IRDB) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        if ((info.data as any)[ist].botID.includes(id)) { return true; }
        await (info.data as any)[ist].botID.push(id);
        (info.data as any)[ist].instances += 1;
        // tslint:disable-next-line: no-shadowed-variable
        info.save((err: any) => {
            if (err) {
                console.error(err);
                return res.json({ sucess: false });
            }
        });
        res.json({ success: true });
    });
});

export = APIRoute;
