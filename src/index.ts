import { bot } from "./bot";
import * as logger from "./services/logger";

import "./commands/commands";
import "./handlers/message";
import "./handlers/callbackQuery";

(async () => {
    bot.launch();

    const me = await bot.telegram.getMe();
    logger.log(`Bot started: @${me.username}`);
})()