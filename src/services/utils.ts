import fs from "fs";
import { getRootPathSync } from "get-root-path";
import { VPNServer, Config } from "./interface";
import { User } from "outlinevpn-api/dist/types";

export function getAllVPNServers(): { [region: string]: VPNServer[] } {
    return JSON.parse(fs.readFileSync(getRootPathSync() + "\\servers.json", "utf-8"))
}

export function getConfig(): Config {
    return JSON.parse(fs.readFileSync(getRootPathSync() + "\\config.json", "utf-8"))
}

export function parseVPNKeys(keys: {user: User, server: VPNServer}[]): string {
    let result = "Ваши ключи:\n\n";

    keys.forEach(key => {
        result += `${key.server.regiontitle}\n\`${key.user.accessUrl + `#${key.server.name}`}\`\n\n`;
    })
    return result;
}