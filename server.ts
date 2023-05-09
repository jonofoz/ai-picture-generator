import * as dotenv from "dotenv";
dotenv.config({path: "./.env.local"});

import { Configuration, OpenAIApi } from "openai";
const apiKey = process.env.API_KEY;

if (!apiKey){
    throw new Error("API_KEY is undefined.");
}

const config = new Configuration({
    apiKey
});

const openAI = new OpenAIApi(config);
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
    try{
        const prompt = req.body.prompt;

        const aiResponse = await openAI.createImage({
           prompt,
           n: 1,
           size: "1024x1024"
        })

        const image = aiResponse.data.data[0].url
        res.send({ image })
    }
    catch (error: any) {
        console.error(error);
        res.status(500).send(error?.response?.data?.error?.message || "Something went wrong" );
    }
});

app.listen(8080, () => console.log("App is ready to generate art on 'http://localhost:8080/generate'!"))