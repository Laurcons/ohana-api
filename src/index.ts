import "./testing.js";
import express from "express";
import chalk from "chalk";
import { initializeInjectables } from "./service/index.js";
import router from "./route/index.js";

const app = express();
const PORT = parseInt(process.env.PORT ?? "3000");

app.use(express.json());

app.use((req, res, next) => {
    res.header("X-Powered-By", "Bubu and Sweat");
    console.log(`[${req.method}] ${req.path}`);
    next();
});

app.use(router);

async function listenAsync() {
    return new Promise<void>((res) => {
        app.listen(PORT, res);
    });
}

console.log("Initializing injectables");
await initializeInjectables();
console.log("Launching app");
await listenAsync();
console.log(chalk.cyan(`App running on port ${PORT}`));