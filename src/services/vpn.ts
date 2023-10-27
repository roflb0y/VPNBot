import { OutlineVPN } from "outlinevpn-api";
import { User } from "outlinevpn-api/dist/types";
import * as config from "../config";
import * as utils from "./utils";
import { VPNServer } from "./interface";
import * as log from "./logger";

process.on("unhandledRejection", (error) => log.error(error));
process.on("uncaughtException", (error) => log.error(error));

async function getVpnServer(region: string): Promise<VPNServer> {
    const config = utils.getConfig();
    const servers = utils.getAllVPNServers();
    const regionServers = servers[region];

    for(let i = 0; i < regionServers.length; i++) {
        const server = servers[region][i];
        log.debug(`Testing ${server.name}`);

        const outlinevpn = new OutlineVPN({
            apiUrl: server.apiUrl,
            fingerprint: server.certSha256
        })

        const users = await outlinevpn.getUsers();
        log.debug(`${users.length} users`);
        log.debug("");

        if (users.length < config.SERVER_LIMIT) return server;
    }

    return servers[region][0];
}

export async function searchUser(name: string) {
    const servers = utils.getAllVPNServers();

    for(let i = 0; i < Object.keys(servers).length; i++) {
        const regionServers = servers[Object.keys(servers)[i]];

        for(let j = 0; j < regionServers.length; j++) {
            const server = regionServers[j];
            log.debug(`Searching for ${name} in ${server.name}`);

            const outlinevpn = new OutlineVPN({
                apiUrl: server.apiUrl,
                fingerprint: server.certSha256
            });

            const users = await outlinevpn.getUsers();
            const user = users.filter((item) => item.name === name);
            if (user.length !== 0) return { "user": user[0], "server": server };
        }
    }
    return undefined;
}

export async function searchUserRegion(name: string, region: string) {
    const servers = utils.getAllVPNServers()[region];

    //im lazy
    for(let j = 0; j < servers.length; j++) {
        const server = servers[j];
        log.debug(`Searching for ${name} in ${server.name}`);

        const outlinevpn = new OutlineVPN({
            apiUrl: server.apiUrl,
            fingerprint: server.certSha256,
            timeout: 5000
        });

        const users = await outlinevpn.getUsers();
        const user = users.filter((item) => item.name === name);
        if (user.length !== 0) return { "user":user[0], "server": server };
    }
    return undefined;
}

export async function getUser(name: string, region: string) {
    const server = await getVpnServer(region);
    const outlinevpn = new OutlineVPN({
        apiUrl: server.apiUrl,
        fingerprint: server.certSha256
    })

    const users = await outlinevpn.getUsers();
    const user = users.filter((item) => item.name === name);
    return user.length === 0 ? undefined : user[0];
}

export async function createUser(name: string, region: string) {
    const server = await getVpnServer(region);
    const outlinevpn = new OutlineVPN({
        apiUrl: server.apiUrl,
        fingerprint: server.certSha256
    })

    console.log(server);

    const user = await outlinevpn.createUser();
    await outlinevpn.renameUser(user.id, name)
    return user.accessUrl + `#${server.name}`;
}

export async function deleteUser(name: string, region: string) {
    const user = await searchUserRegion(name, region);
    if (!user) return;

    const outlinevpn = new OutlineVPN({
        apiUrl: user.server.apiUrl,
        fingerprint: user.server.certSha256
    })

    await outlinevpn.deleteUser(user.user.id);
    return;
}

export async function getAllUserKeys(name: string): Promise<{user: User, server: VPNServer}[] | undefined> {
    const servers = utils.getAllVPNServers();
    let keys = [];

    for(let i = 0; i < Object.keys(servers).length; i++) {
        const user = await searchUserRegion(name, Object.keys(servers)[i]);
        if (user) keys.push(user);
    }
    
    return keys.length !== 0 ? keys : undefined;
}