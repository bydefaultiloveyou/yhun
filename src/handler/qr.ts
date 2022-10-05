import qrcode from "qrcode-terminal"

export const QrHandler = (qr : string) => qrcode.generate(qr, { small : true }) 
