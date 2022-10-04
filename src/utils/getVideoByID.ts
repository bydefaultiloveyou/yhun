import yts from "yt-search";

export const GetVideoByID = async ( id : string ) => await yts({videoId : id})