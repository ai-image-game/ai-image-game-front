import CryptoJS from "crypto-js";
import * as cookie from 'cookie';


export default function saveImageGameInfo(req, res) {
    if (req.method === 'POST') {
        const { data } = req.body;
        console.log("cookie will create with ", data);

        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(process.env.SECRET_KEY), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();

        res.setHeader('Set-Cookie', cookie.serialize('savedData', encryptedData, {
            path : '/',
            maxAge : 60 * 60 * 24 * 100,
            secure : false
        }));
        res.status(200).json({message : 'success'});
    }
    res.status(400).json({message : 'Only accept POST.'});
}