import dotenv from 'dotenv'
import { Command } from 'commander'
import { logger } from './logger.js';
import { __dirname } from '../utils.js';
import path from "path";

const program = new Command();

program.option('-m, --Mode <mode>', 'Mode to run the application', 'dev')
        .option('-p, --PORT <port>', 'Port to run the aplication', 8080)
        .option('-d --DEBUG <debug>', 'Debug mode', false)
program.parse();

logger.info('program.option()', program.opts())

const enviroment = program.opts().Mode

logger.info('enviroment: ', enviroment)

dotenv.config({
    path: enviroment === 'dev' 
    ? path.resolve(__dirname, ".env.development")
    : path.resolve(__dirname, ".env.production")
})

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminGmail: process.env.ADMIN_GMAIL,
    gmailAppPass: process.env.GMAIL_APP_PASS
}