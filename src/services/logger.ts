import chalk from "chalk";

export const log = (msg: string) => {
    console.log(chalk.greenBright(`[${new Date().toLocaleString()}] INFO: ${msg}`));
}

export const debug = (msg: string) => {
    console.log(chalk.magentaBright(`[${new Date().toLocaleString()}] DEBUG: ${msg}`));
}

export const error = (msg: string | Error | any) => {
    console.log(chalk.redBright(`[${new Date().toLocaleString()}] ERROR: ${msg}`))
}