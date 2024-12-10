import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/database";
sequelize;
import bodyParser from "body-parser";
import methodOverride from 'method-override';
import path from "path";

import { adminRoutes } from "./routes/admin/index.route";
import { routesClient } from "./routes/client/index.route";
import { systemConfig } from "./config/system";

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Cấu hình method-override
app.use(methodOverride('_method'));

//tiny mce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

adminRoutes(app);
routesClient(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});