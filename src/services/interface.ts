export interface VPNServer {
    region: string,
    regiontitle: string,
    name: string,
    apiUrl: string,
    certSha256: string
}

export interface Config {
    SERVER_LIMIT: number
}