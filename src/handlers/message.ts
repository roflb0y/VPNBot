import { bot } from "../bot";
import { message } from "telegraf/filters";
import * as vpn from "../services/vpn";
import * as inlineMarkups from "../markups/inlineMarkups";
import * as utils from "../services/utils";

bot.on(message("text"), async (ctx) => {
    if (ctx.message.text == "Мои ключи") {
        const msg = await ctx.reply("Загрузка ключей...")

        const userKeys = await vpn.getAllUserKeys(ctx.message.from.id.toString());
        if (!userKeys) {
            await bot.telegram.editMessageText(msg.chat.id, msg.message_id, undefined, "У вас нет созданных ключей");
            return;
        }

        const parsedKeys = utils.parseVPNKeys(userKeys);
        const inlineButton = inlineMarkups.deleteKeyButton;

        await bot.telegram.editMessageText(msg.chat.id, msg.message_id, undefined, parsedKeys, { reply_markup: inlineButton.reply_markup, parse_mode: "MarkdownV2" });
        return;
    }

    else if (ctx.message.text == "Создать ключ") {
        await ctx.reply("Выберите регион", inlineMarkups.vpnRegionButtons);
        return;
    }
})