import ytdl from "ytdl-core";
import fs from "fs"
import { client } from "../app";
import { Message, MessageMedia } from "whatsapp-web.js";
import { id } from "./youtube";
import { GetVideoByID } from "../utils/getVideoByID";

const sendAudio = async (
  video : any,
  msg : Message
) => {
  const media = await MessageMedia.fromFilePath(`public/audio/${(await video).title}.mp3`)
  client.sendMessage(msg.from, media, {
    sendMediaAsDocument : true
    /** jika sudah dikirim chat selesai */
  }).then(() => client.sendMessage(msg.from, "Selesai Monyet!!"))
}

const download = async (
  video : any,
  msg : Message,
  path : string
) => {
  /** check jika file nya sudah ada / belom */
  if ( !fs.existsSync(path) ) {
    /** jika blm download file */ 
    await ytdl((await video).url,
    {
      filter: "audioonly",
      quality: "140"
    })
    .pipe(fs.createWriteStream(path))
    .on("finish", async function() {
      /** jika download selesai kirim ke client */
      await sendAudio(video, msg)
      /** jika audio sudah dikirim hapus file lagunya */
      .then(async () => {
        fs.rmSync(`public/audio/${(await video).title}.mp3`)
      })
    })
  }
}

export const Mp3Download = async (
  msg : Message
) => {
  client.sendMessage(msg.from, "Bentar Monyet!!")
  /** ambil id video */
  const video = GetVideoByID(id)
  try {
    const path : string = `public/audio/${(await video).title}.mp3` 
    /** check jika folder audio belom ada */
    if (!fs.existsSync("public/audio")) {
      /** bikin folder */
      fs.mkdirSync("public/audio")
      /** download */
      await download(video, msg, path)
    } else {
      /** check jika file nya sudah ada / belom */
      if ( !fs.existsSync(path) ) {
        /** jika blm download file */ 
        await download(video,msg,path)
      } else {
        /** jika sudah ada file di folder kitim */
        await sendAudio(video, msg)
      }
    }
  }
  
  catch {
    client.sendMessage(msg.from, "downlod error")
  }

}