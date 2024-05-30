import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import millsRoute from "./routes/millsRoute.js";
import {sequelize} from "./models/ModelSequelizer.js";
import "dotenv/config"
const app = express();
const port = process.env.PORT ||5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
sequelize.sync({force:true});
// Mount the millsRoute middleware
app.use("/api", millsRoute);

app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
