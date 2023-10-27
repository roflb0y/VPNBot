import { Markup } from "telegraf";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";
import * as utils from "../services/utils";

export const deleteKeyButton = Markup.inlineKeyboard([
    Markup.button.callback("Удалить ключ", "delete_key")
]);

export const vpnRegionButtons = () => {
    let buttons: InlineKeyboardButton[] = [];
    const servers = utils.getAllVPNServers();

    Object.keys(servers).forEach(key => {
        const server = servers[key][0];
        buttons.push(Markup.button.callback(server.regiontitle, `create_key_${server.region}`));
    })

    return Markup.inlineKeyboard([buttons]);
}
