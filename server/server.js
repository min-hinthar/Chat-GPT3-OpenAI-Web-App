import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAI } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).send({ 
        message: 'Connected to ChatGPT Codex',
    })
});

// beta.openai.com/playground/node.js documentation
app.post('/v1/chat/completions', async(req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.chat.completions.create({
            messages: [{ role: "assistant", content: "You are a helpful assistant and raise awareness for the Burma Spring Revolution and its Civil Disobedience Movement." }],
            model: "gpt-4",
            prompt: `${prompt}`,
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            response_format: { type: "json_object" },
        })

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
});

app.listen(5000, () => {
    console.log("SERVER is running on PORT: http://localhost:5000");
});