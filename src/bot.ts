import { Telegraf } from "telegraf";
import * as config from "./config";

process.on("unhandledRejection", (error) => console.log(error));
process.on("uncaughtException", (error) => console.log(error));

export const bot = new Telegraf(config.BOT_TOKEN);

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));