import dotenv from "dotenv";
import nodemailer from 'nodemailer'
import { __dirname } from '../utils.js';
import { Router } from "express";
import twilio from 'twilio'
const router = Router()
dotenv.config();

console.log(process.env.ADMIN_GMAIL);
console.log(process.env.GMAIL_APP_PASS);

//Nodemailer
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.ADMIN_GMAIL,
        pass: process.env.GMAIL_APP_PASS
    }
})

router.get("/nodemailer", async (req,res) => {
    try {
        let result = await transport.sendMail({
            from: 'Coder test',
            to: process.env.ADMIN_GMAIL,
            subject: 'Correo de prueba',
            html: `
                <h1>Correo de prueba</h1>
            `,
            attachments: [{
                filename: 'tumblr_2e4a0089e511b8bdff1c7dd48569489c_03d91c8e_540.webp',
                path:__dirname + '/public/img/tumblr_2e4a0089e511b8bdff1c7dd48569489c_03d91c8e_540.webp',
                cid: 'lightbikes'
            }]
        })
        res.send({status: "Success", payload: result})
    } catch (error) {
        console.log(error);
    }
})

//Twilio
const client = twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)

router.get("/sms", async (req,res) => {
    try {
        let result = await client.messages.create({
            body: 'Mensaje de SMS desde el VSC',
            from: process.env.TWILIO_REGISTERED_PHONE,
          to: process.env.TWILIO_REGISTERED_PHONE //corregir
        })
    res.send({status: "Success", payload:result, result: "Mensaje enviado"})
    } catch (error) {
        console.log(error);
    }
})

export default router;