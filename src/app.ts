import WAWebJS, { Client, LocalAuth } from "whatsapp-web.js"
import MessagesHanlder from "./handler/masages"
import { QrHandler } from "./handler/qr"
import { ReadyHandler } from "./handler/ready"
import express, {Express} from "express";

const app : Express = express()

export const client : WAWebJS.Client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer : {
    headless: true,
    args : ['--no-sandbox']
  }
})

client.on("message", MessagesHanlder)

client.on("qr", QrHandler)
client.on("ready", ReadyHandler)

client.initialize()

app.listen(3000, () => console.log('running oi nande nande'))