import * as express from "express";
import APIRoute = require("./routes/APIRoute");
import BadgeRoute = require("./routes/BadgeRoute");

const app = express();

app.use("/api", APIRoute);
app.use("/badge", BadgeRoute);

app.listen(process.env.port || 3000, () => {
    console.log("Started"); // tslint:disable-line no-console
});
