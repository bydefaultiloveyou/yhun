import WAWebJS, { Client, LocalAuth } from "whatsapp-web.js"
import MessagesHanlder from "./handler/masages"
import { QrHandler } from "./handler/qr"
import { ReadyHandler } from "./handler/ready"

export const client : WAWebJS.Client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer : {
    headless: true,
    args : ["--no-sanbox"]
  }
})

client.on("message", MessagesHanlder)
client.on("qr", QrHandler)
client.on("ready", ReadyHandler)


client.initialize()