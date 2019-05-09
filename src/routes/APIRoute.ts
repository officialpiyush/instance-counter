import { json } from "body-parser";
import { Router } from "express";
import { IRDB } from "../interfaces/IRDB";
import { db } from "../utils/Database";

const APIRoute = Router();

APIRoute.use(json());

APIRoute.post("/instances/tags", async (req, res): Promise<any> => {
    const id = (req as any).body.id;
    if (!id) { return res.json({ sucess: false }); }
    db.findOne({ id: 0 }, async (err, info: IRDB) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        if (info.data.tags.botID.includes(id)) { return true; }
        await info.data.tags.botID.push(id);
        info.data.tags.instances += 1;
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

APIRoute.post("/instances/announcement", async (req, res): Promise<any> => {
    const id = (req as any).body.id;
    if (!id) { return res.json({ sucess: false }); }
    db.findOne({ id: 0 }, async (err, info: IRDB) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        if (info.data.announcement.botID.includes(id)) { return true; }
        await info.data.announcement.botID.push(id);
        info.data.announcement.instances += 1;
        info.save();
        return res.json({ success: true });
    });
});

APIRoute.post("/instances/dmonjoin", async (req, res): Promise<any> => {
    const id = (req as any).body.id;
    if (!id) { return res.json({ sucess: false }); }
    db.findOne({ id: 0 }, async (err, info: IRDB) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        if (info.data.dmonjoin.botID.includes(id)) { return true; }
        await info.data.dmonjoin.botID.push(id);
        info.data.dmonjoin.instances += 1;
        info.save();
        return res.json({ success: true });
    });
});

APIRoute.post("/instances/hastebin", async (req, res): Promise<any> => {
    const id = (req as any).body.id;
    if (!id) { return res.json({ sucess: false }); }
    db.findOne({ id: 0 }, async (err, info: IRDB) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        if (info.data.hastebin.botID.includes(id)) { return true; }
        await info.data.hastebin.botID.push(id);
        info.data.hastebin.instances += 1;
        info.save();
        return res.json({ success: true });
    });
});

APIRoute.post("/instances/leaveserver", async (req, res): Promise<any> => {
    const id = (req as any).body.id;
    if (!id) { return res.json({ sucess: false }); }
    db.findOne({ id: 0 }, async (err, info: IRDB) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        if (info.data.leaveserver.botID.includes(id)) { return true; }
        await info.data.leaveserver.botID.push(id);
        info.data.leaveserver.instances += 1;
        info.save();
        return res.json({ success: true });
    });
});

APIRoute.post("/instances/translator", async (req, res): Promise<any> => {
    const id = (req as any).body.id;
    if (!id) { return res.json({ sucess: false }); }
    db.findOne({ id: 0 }, async (err, info: IRDB) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }
        if (info.data.translator.botID.includes(id)) { return true; }
        await info.data.translator.botID.push(id);
        info.data.translator.instances += 1;
        info.save();
        return res.json({ success: true });
    });
});

export = APIRoute;
