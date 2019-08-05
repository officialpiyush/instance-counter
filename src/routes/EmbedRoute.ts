import { json } from "body-parser";
import { Router } from "express";
import fetch, { Response } from "node-fetch";
import config from "../../config";
import { db } from "../utils/Database";

const EmbedRoute = Router();
const base = "https://img.shields.io/badge";

EmbedRoute.use(json());

let aPlugins: any = fetch(config.pluginsJSON)
    .then((res: Response) => res.json())
    .then((j: JSON | any) => j.allowed);

async function resolvePlugin() {
        aPlugins = await aPlugins;
}

resolvePlugin();

EmbedRoute.get("/:ist", async (req, res) => {
    const ist: string = (req as any).params.ist;
    if (!aPlugins.includes(ist)) {
        return returnBadge(
            `${base}/404-Instance%20Not%20Found-red.png?style=for-the-badge`,
            res);
    }
    const r = await db.get(ist);

    if (r === -1) { return returnBadge(`${base}/Error-True-red.png?style=for-the-badge`, res); }
    return returnBadge(
            `${base}/Downloads-${r}-brightgreen.png?style=for-the-badge`, res);
});

async function returnBadge(link: string, res: any) {
    fetch(link).then((resp) => (resp as any).buffer()).then((buffer) => {
        (res as any).writeHead(200, {
            "Cache-Control": "max-age=600",
            "Content-Length": buffer.length,
            "Content-Type": "image/png",
        });
        (res as any).end(buffer);
    });
}

export = EmbedRoute;
