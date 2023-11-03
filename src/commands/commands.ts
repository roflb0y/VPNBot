import { bot } from "../bot";
import { mainButtons } from "../markups/keyboardMarkups";
import * as vpn from "../services/vpn";

bot.start(async (ctx) => {
    await ctx.reply("Привет", mainButtons);
    return;
});

bot.command("test", async (ctx) => {
    await ctx.scene.enter("TEST_SCENE");
    return;
})