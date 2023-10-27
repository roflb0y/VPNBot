import { callbackQuery } from "telegraf/filters"
import { bot } from "../bot";
import * as vpn from "../services/vpn";

bot.action("delete_key", async ctx => {
    const user = await vpn.searchUser(ctx.callbackQuery.from.id.toString());
    if (user) {
        await vpn.deleteUser(ctx.callbackQuery.from.id.toString(), user.server.region);
    }

    await ctx.editMessageText("Ключ удален");
})

bot.action(/^create_key_/, async (ctx) => {
    if (ctx.has(callbackQuery("data"))) {
        await bot.telegram.editMessageText(ctx.chat?.id, ctx.callbackQuery.message?.message_id, undefined, `Загрузка...`);

        const region = ctx.callbackQuery.data.slice(-2);
        const user = await vpn.searchUserRegion(ctx.callbackQuery.from.id.toString(), region)
        if (user) {
            await bot.telegram.editMessageText(ctx.chat?.id, ctx.callbackQuery.message?.message_id, undefined, `У вас уже есть ключ в этом регионе:\n\n\`${user.user.accessUrl + `#${user.server.name}`}\``, { parse_mode:"MarkdownV2" });
            return;
        }

        const vpnKey = await vpn.createUser(ctx.callbackQuery.from.id.toString(), region);

        await bot.telegram.editMessageText(ctx.chat?.id, ctx.callbackQuery.message?.message_id, undefined, `Ключ успешно создан\\!\n\n\`${vpnKey}\``, { parse_mode:"MarkdownV2" });
    }
})