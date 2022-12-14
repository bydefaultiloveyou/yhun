import { Message } from "whatsapp-web.js";
import Salam from "../event/salam";
import Sticker from "../event/sticker";
import { Youtube } from "../event/youtube";
import getVideoId from 'get-video-id';
import { Mp3Download } from "../event/download";

const MessagesHanlder = async (
  message : Message
) => {
  
  /** jika pesan dari status / group berhentikan */
  if (message.isStatus || message.author) return;
  
  /** jika melakukan salam balas */
  Salam(message)
  
  /** atur command */
  const command : string[] = message.body.split(" ")

  if ( command[0] === "!yt" ) {
    /** get id video */
    const idYoutube : string | null = getVideoId(command[1]).id

    /** check info youtube video */
    Youtube(idYoutube, message)    
  }
  
  // /** jika commandnya sticker buat */
  if ( command[0] === "!sticker" && message.type === "image" ) Sticker(message)

  // /** download audio if client send message 'mp3' */
  if ( message.body === "🎶 mp3" ) Mp3Download(message)

} 

export default MessagesHanlder