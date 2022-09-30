import { Message, MessageMedia } from "whatsapp-web.js";
import { client } from "../app";

const Salam = (
  msg : Message
) => {
  const salam : string[] = ["ko", "miko", "Ko", "Miko", "assalamualaikum", "Assalamualaikum"]
  salam.map( async (items) => {
    if ( msg.body === items) {
      if ( msg.body === "assalamualaikum" || msg.body === "Assalamualaikum" ) {
        msg.reply("Waalaikumsalam")
      } else {
        msg.reply("naon? saya off mungkin yang bales kemungkinan bot!!")
        const media = await MessageMedia.fromFilePath("public/raiden.jpg")
        client.sendMessage( msg.from ,media, {
          sendMediaAsSticker : true,
          stickerName : "yhun sticker",
          stickerAuthor : "yhun"
        })
      }
    }
  })
}

export default Salam