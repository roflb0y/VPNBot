import { Telegraf, session, Scenes } from "telegraf";
import * as config from "./config";

import { testScene } from "./scenes/testScene";

process.on("unhandledRejection", (error) => console.log(error));
process.on("uncaughtException", (error) => console.log(error));

export const bot = new Telegraf<Scenes.WizardContext>(config.BOT_TOKEN);
bot.use(session());

const stage = new Scenes.Stage([testScene]);
bot.use(stage.middleware());

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));