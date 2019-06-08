import { json } from "body-parser";
import { Router } from "express";
import fetch, { Response } from "node-fetch";
import { IRDB } from "../interfaces/IRDB";
import { db } from "../utils/Database";

const EmbedRoute = Router();
const base = "https://img.shields.io/badge";

EmbedRoute.use(json());

const aPlugins: any = fetch("https://raw.githubusercontent.com/officialpiyush/modmail-plugins/master/plugins.json")
    .then((res: Response) => res.json())
    .then((j: JSON | any) => j.allowed);

EmbedRoute.get("/:ist", (req, res) => {
    const ist: string = (req as any).params.ist;
    if (!aPlugins.includes(ist)) {
        return returnBadge(
            "404-Instance%20Not%20Found-red.png?style=for-the-badge",
            res);
    }
    db.findOne({ id: 0 }, (err: any, info: IRDB) => {
        if (err) { return returnBadge(`${base}/Error-True-red.png?style=for-the-badge`, res); }
        return returnBadge(
            `${base}/Downloads-${(info.data as any)[ist].instances}-brightgreen.png?style=for-the-badge`, res);
    });
});

async function returnBadge(link: string, res: any) {
    fetch(link).then((resp) => (resp as any).buffer()).then((buffer) => {
        (res as any).writeHead(200, {
            "Cache-Control": "max-age=600",
            "Content-Length": buffer.length,
            "Content-Type": "image/svg+xml",
        });
        (res as any).end(buffer);
    });
}

export = EmbedRoute;
