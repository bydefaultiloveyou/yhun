import { Message } from "whatsapp-web.js"
import { client } from "../app"

const Sticker = async (
    msg : Message 
) => {

    client.sendMessage(msg.from, "Buat sticker ya monyet?")
	
		try {

			const media = await msg.downloadMedia()
			client.sendMessage(msg.from, media, {
					sendMediaAsSticker : true,
					stickerName : "yhun sticker",
					stickerAuthor : "yhun"
			}).then(() => client.sendMessage(msg.from, "nah udah bilang apa?"))
  
		} catch {
			client.sendMessage(msg.from, "blm bisa kntl!!")
		}
}       

export default Sticker