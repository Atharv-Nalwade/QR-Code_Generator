const express = require ('express');
const bodyParser = require('body-parser');
var QRCode = require('qrcode');
const urlValidator = require('url-validator');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/create',async (req,res)=>{
    try {
        const url = req.body.url;
       
            const Qrcode = await QRCode.toBuffer(url);
            res.set('Content-Type', 'image/png');
            res.send(Qrcode);
       
            // return res.status(404).json({
            //     Message:"Invalid URL"
            // })
        }
     catch (error) {
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
});  


app.listen(3000,async ()=>{
      console.log('Server started on 3000');
})
