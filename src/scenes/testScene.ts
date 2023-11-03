import { bot } from "../bot";
import { Scenes } from "telegraf";
import { message } from "telegraf/filters";

export const testScene = new Scenes.WizardScene<Scenes.WizardContext>("TEST_SCENE", 
    async ctx => {
        ctx.reply("send random message");
        ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.has(message("text"))) return;
        
        ctx.reply(ctx.message.text);
        ctx.scene.leave();
    })