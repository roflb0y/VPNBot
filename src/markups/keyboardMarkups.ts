import { Markup } from "telegraf";

export const mainButtons = Markup.keyboard([
        [Markup.button.text("Создать ключ"),
        Markup.button.text("Мои ключи")]
]).resize();