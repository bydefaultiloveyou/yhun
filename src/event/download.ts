import ytdl from "ytdl-core";
import fs from "fs"
import { client } from "../app";
import { Message } from "whatsapp-web.js";
import { id } from "./youtube";
import { GetVideoByID } from "../utils/getVideoByID";

export const Mp3Download = async (
  msg : Message
) => {

  console.log(id)
  // client.sendMessage(msg.from, "Downloading song .....")

  // const video = GetVideoByID(id)
  
  // try {

  //   const path : string = `public/song/${(await video).title}.mp3` 
  //   if ( !fs.existsSync(path) ) await ytdl((await video).url, { filter: "audioonly"}).pipe(fs.createWriteStream(path)).addListener("finish", function() {
  //     client.sendMessage(msg.from, "download finish")
  //   })

  // } catch {

  //   client.sendMessage(msg.from, "downlod error")

  // }

}