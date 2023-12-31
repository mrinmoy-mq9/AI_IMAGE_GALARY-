import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration , OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
    apiKey:process.env.OPENAI,
})

const openai = new OpenAIApi(config);

router.get('/',(req ,res) => {
    res.send('hello from dall e 23');
})

router.route('/').post( async (req , res) => {

   try {
    const {prompt} = req.body;

    const aiResponse = openai.createImage({
        prompt,
        n:1,
        size:'1024x1024',
        response_format:'b64_json'

    });

    const image = (await aiResponse).data.data[0].b64_json;

    res.status(200).json({photo: image});
    
   } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
   }
});

export default router;