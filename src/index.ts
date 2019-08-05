import * as express from "express";
import config from "../config";
import APIRoute = require("./routes/APIRoute");
import BadgeRoute = require("./routes/BadgeRoute");
import ContributorRoute = require("./routes/ContributorRoute");
import EmbedRoute = require("./routes/EmbedRoute");

const app = express();

app.use("/api", APIRoute);
app.use("/badge", BadgeRoute);
app.use("/embed", EmbedRoute);
app.use("/contributors", ContributorRoute);

app.listen(config.port, () => {
    console.log("Started"); // tslint:disable-line no-console
});
