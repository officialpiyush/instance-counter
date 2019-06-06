import { json } from "body-parser";
import { Router } from "express";
import fetch from "node-fetch";
import { IRDB } from "../interfaces/IRDB";
import { db } from "../utils/Database";

const BadgeRoute = Router();
const base = "https://img.shields.io/badge";

BadgeRoute.use(json());

BadgeRoute.get("/tags", (req, res) => {
    db.findOne({ id: 0 }, (err: any, info: IRDB) => {
        if (err) { return returnBadge(`${base}/Error-True-red.svg`, res); }
        return returnBadge(`${base}/Downloads-${info.data.tags.instances}-brightgreen.svg`, res);
    });
});

BadgeRoute.get("/translator", (req, res) => {
    db.findOne({ id: 0 }, (err: any, info: IRDB) => {
        if (err) { return returnBadge(`${base}/Error-True-red.svg`, res); }
        return returnBadge(`${base}/Downloads-${info.data.translator.instances}-brightgreen.svg`, res);
    });
});

BadgeRoute.get("/dmonjoin", (req, res) => {
    db.findOne({ id: 0 }, (err: any, info: IRDB) => {
        if (err) { return returnBadge(`${base}/Error-True-red.svg`, res); }
        return returnBadge(`${base}/Downloads-${info.data.dmonjoin.instances}-brightgreen.svg`, res);
    });
});

BadgeRoute.get("/leaveserver", (req, res) => {
    db.findOne({ id: 0 }, (err: any, info: IRDB) => {
        if (err) { return returnBadge(`${base}/Error-True-red.svg`, res); }
        return returnBadge(`${base}/Downloads-${info.data.leaveserver.instances}-brightgreen.svg`, res);
    });
});

BadgeRoute.get("/announcement", (req, res) => {
    db.findOne({ id: 0 }, (err: any, info: IRDB) => {
        if (err) { return returnBadge(`${base}/Error-True-red.svg`, res); }
        return returnBadge(`${base}/Downloads-${info.data.announcement.instances}-brightgreen.svg`, res);
    });
});

BadgeRoute.get("/hastebin", (req, res) => {
    db.findOne({ id: 0 }, (err: any, info: IRDB) => {
        if (err) { return returnBadge(`${base}/Error-True-red.svg`, res); }
        return returnBadge(`${base}/Downloads-${info.data.hastebin.instances}-brightgreen.svg`, res);
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

export = BadgeRoute;
