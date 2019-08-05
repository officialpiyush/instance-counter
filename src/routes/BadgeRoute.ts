import { json } from "body-parser";
import { Router } from "express";
import fetch, { Response } from "node-fetch";
import config from "../../config";
import { db } from "../utils/Database";

const BadgeRoute = Router();
const base = "https://img.shields.io/badge";

BadgeRoute.use(json());


let aPlugins: any = fetch(config.pluginsJSON)
    .then((res: Response) => res.json())
    .then((j: JSON | any) => j.allowed);

async function resolvePlugin() {
        aPlugins = await aPlugins;
}

resolvePlugin();

BadgeRoute.get("/:ist", async (req, res) => {
    const ist: string = (req as any).params.ist;
    if (!aPlugins.includes(ist)) {
        return returnBadge(
            `${base}/404-Instance%20Not%20Found-red.svg?style=for-the-badge`,
            res);
    }
    const r = await db.get(ist);
    if (r === -1) { return returnBadge(`${base}/Error-True-red.svg`, res); }
    return returnBadge(`${base}/Downloads-${r}-brightgreen.svg`, res);
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

export = BadgeRoute;
