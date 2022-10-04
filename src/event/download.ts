import ytdl from "ytdl-core";
import fs from "fs"
import { client } from "../app";
import { Message, MessageMedia } from "whatsapp-web.js";
import { id } from "./youtube";
import { GetVideoByID } from "../utils/getVideoByID";

export const Mp3Download = async (
  msg : Message
) => {

  // console.log(id)
  client.sendMessage(msg.from, "Downloading song .....")

  const video = GetVideoByID(id)
  
  try {

    if (!fs.existsSync("public/audio")) {
      fs.mkdirSync("public/audio")
    } else {
      const path : string = `public/audio/${(await video).title}.mp3` 
      if ( !fs.existsSync(path) ) {
      await ytdl((await video).url,
      {
        filter: "audioonly",
        quality: "140"
      })
      .pipe(fs.createWriteStream(path))
      .on("finish", async function() {
        const media = await MessageMedia.fromFilePath(`public/audio/${(await video).title}.mp3`)
        client.sendMessage(msg.from, media, {
          sendAudioAsVoice : true
        })
        client.sendMessage(msg.from, "download finish")
      })
    } else {
      
    }
    }
  } catch {
    client.sendMessage(msg.from, "downlod error")
  }

}