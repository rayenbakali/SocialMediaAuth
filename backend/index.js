import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieSession from "cookie-session";

import { PORT, __DEV__ } from "./src/config/default.js";
import mongoConfig from "./src/config/mongo.js";
import { errorHandler, noRouteFound } from "./src/middlewares/errors.js";

import PharmacyRouter from "./src/routes/pharmacy.js";
import MedRouter from "./src/routes/med.js";
import passport from "./src/config/passport.js";
import authRoute from "./src/routes/auth.js";

const app = express();

await mongoConfig();

app.use(
  cookieSession({ name: "session", keys: ["baka"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(morgan(__DEV__ ? "dev" : "tiny"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/img",
  express.static("public/img", {
    extensions: ["jpg", "jpeg", "png"],
  })
);

app.use("/auth", authRoute);
app.use("/pharmacy", PharmacyRouter);
app.use("/med", MedRouter);

app.use(noRouteFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
