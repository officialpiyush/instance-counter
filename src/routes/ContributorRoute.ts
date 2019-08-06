import { Canvas } from "canvas-constructor";
import { Router } from "express";
import fetch, { Response } from "node-fetch";
import config from "../../config";

const ContributorRoute = Router();

ContributorRoute.get("/", async (req, res) => {
    const contri = await fetch(`https://api.github.com/repos/${config.repo}/contributors`)
        .then((r: Response) => r.json());
    let base = 80;
    const x = 160 * contri.length;
    const canvas = new Canvas(x, 160);
    for (const user of contri) {
        const av = await fetch(user.avatar_url).then((r: Response) => r.buffer());
        canvas.addCircularImage(av, base, 80, 70);
        base += 160;
    }
    const cb = canvas.toBuffer();

    res.writeHead(200, {
        "Cache-Control": "max-age=600",
        "Content-Length": cb.length,
        "Content-Type": "image/png",
    });

    res.end(cb);
});

export = ContributorRoute;
