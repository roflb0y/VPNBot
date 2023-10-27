import { Markup } from "telegraf";

export const deleteKeyButton = Markup.inlineKeyboard([
    Markup.button.callback("Удалить ключ", "delete_key")
]);

export const vpnRegionButtons = Markup.inlineKeyboard([
    [Markup.button.callback("Нидерланды 🇳🇱", "create_key_nl"),
    Markup.button.callback("Польша 🇵🇱", "create_key_pl")]
])