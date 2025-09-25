import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command();

program.option('-m, --Mode <mode>', 'Mode to run the application', 'dev')
        .option('-p, --PORT <port>', 'Port to run the aplication', 8080)
        .option('-d --DEBUG <debug>', 'Debug mode', false)
program.parse();

console.log('program.option()', program.opts());

const enviroment = program.opts().Mode
console.log('enviroment: ', enviroment);

dotenv.config({
    path: enviroment === 'dev' ? './src/config/.env.development' : '.env.production'
})

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME
}