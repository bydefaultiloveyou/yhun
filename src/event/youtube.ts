import WAWebJS, { Buttons, Message, MessageMedia } from 'whatsapp-web.js';
import { client } from '../app';
import { GetVideoByID } from '../utils/getVideoByID';

let id : string
const Youtube = async (
  idYoutube : string | null,
  message : Message,
) => {

    /** jika url nya kosong makan hentikan */
    if ( idYoutube === null ) return

    /** get video by id */
    // const video : yts.VideoMetadataResult = await yts({ videoId : idYoutube})
    const video = await GetVideoByID(idYoutube)
    id = idYoutube

    /** get thumbnail video */
    const thumbnail : MessageMedia = await MessageMedia.fromUrl(video.thumbnail)

    /** send image  */
    client.sendMessage(message.from, "sabar ya cantik/ganteng...")

    /** text on message */
    const informationVideo : {
      body :string,
      title : string,
      button : [{}]
    } = {
      body : `\nTitle : ${video.title}\nUrl : ${video.url}\nAuthor : ${video.author.name}\nViews : ${video.views}\nUpload Date : ${video.uploadDate}`,
      title : "* Information Videos 🚀 *",
      button : [
        {id : `mp3 ${video.title}`,body : "!yt mp3"},
      ]
    }

    /** send message */
    try {

      const replyMsg : WAWebJS.Buttons = new Buttons(informationVideo.body, informationVideo.button, informationVideo.title)
      await client.sendMessage(message.from ,thumbnail)
      client.sendMessage(message.from, replyMsg)
      
    } catch {
     
      message.reply('gak bisa ambil data video bang maap!!')
    
    }

}


export { Youtube, id }