import { json } from "body-parser";
import { Router } from "express";
import { IRDB } from "../interfaces/IRDB";
import { db } from "../utils/Database";

const BadgeRoute = Router();
const base = "https://img.shields.io/badge";

BadgeRoute.use(json());

BadgeRoute.get("/tags", (req, res) => {
    db.findOne({ id: 0 }, (err, info: IRDB) => {
        if (err) { return res.redirect(`${base}/Error-True-red.svg`); }
        return res.redirect(`${base}/Instances-${info.data.tags.instances}-brightgreen.svg`);
    });
});

BadgeRoute.get("/translator", (req, res) => {
    db.findOne({ id: 0 }, (err, info: IRDB) => {
        if (err) { return res.redirect(`${base}/Error-True-red.svg`); }
        return res.redirect(`${base}/Instances-${info.data.translator.instances}-brightgreen.svg`);
    });
});

BadgeRoute.get("/dmonjoin", (req, res) => {
    db.findOne({ id: 0 }, (err, info: IRDB) => {
        if (err) { return res.redirect(`${base}/Error-True-red.svg`); }
        return res.redirect(`${base}/Instances-${info.data.dmonjoin.instances}-brightgreen.svg`);
    });
});

BadgeRoute.get("/leaveserver", (req, res) => {
    db.findOne({ id: 0 }, (err, info: IRDB) => {
        if (err) { return res.redirect(`${base}/Error-True-red.svg`); }
        return res.redirect(`${base}/Instances-${info.data.leaveserver.instances}-brightgreen.svg`);
    });
});

BadgeRoute.get("/announcement", (req, res) => {
    db.findOne({ id: 0 }, (err, info: IRDB) => {
        if (err) { return res.redirect(`${base}/Error-True-red.svg`); }
        return res.redirect(`${base}/Instances-${info.data.announcement.instances}-brightgreen.svg`);
    });
});

BadgeRoute.get("/hastebin", (req, res) => {
    db.findOne({ id: 0 }, (err, info: IRDB) => {
        if (err) { return res.redirect(`${base}/Error-True-red.svg`); }
        return res.redirect(`${base}/Instances-${info.data.hastebin.instances}-brightgreen.svg`);
    });
});

export = BadgeRoute;
