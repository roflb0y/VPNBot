import { bot } from "../bot";
import { mainButtons } from "../markups/keyboardMarkups";
import * as vpn from "../services/vpn";

bot.start(async (message) => {
    await message.reply("Привет", mainButtons);
    return;
});