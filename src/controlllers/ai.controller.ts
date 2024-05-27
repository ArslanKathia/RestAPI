import { Client } from '@gradio/client';
import { Request, Response } from 'express';
export const importDynamic = new Function('modulePath', 'return import(modulePath)');
import { AppStrings } from '../helpers/app-string';
import axios from 'axios';


export class AIController{
    static async aichat(req:Request,res:Response){
        
        const { Client } = await importDynamic('@gradio/client');
        const { text } = req.body;
        console.log(`body variable:${text}`);
        const client = await Client.connect(AppStrings.OPENGPT_URL);
        // const result = await client.predict("/lambda",{
        //     selection : "Greedy",
        // });

        const result = await client.predict("/chat", { 		
            message: {"text":text,"files":[]}, 		
            request: "idefics2-8b-chatty", 		
            param_3: "Greedy", 		
            param_4: 0, 		
            param_5: 2048, 		
            param_6: 0.01, 		
            param_7: 0.01, 
        });

        console.log('result:' +result.data);

        res.status(200).json({
            result: result.data
        });
    }

    static async chat2(req:Request,res:Response){
        
        const { Client } = await importDynamic('@gradio/client');
        const client = await Client.connect("cognitivecomputations/chat");
        const { text } = req.body;

        const result = await client.predict("/chat", { 		
                        message: text, 		
                        request: "dolphin-2.9.1-yi-1.5-34b-Q6_K.gguf", 		
                        param_3: 8196, 		// max token
                        param_4: 0.7, 		//tempature 
                        param_5: 0.95, 		// Top-p   
                        param_6: 40, 		//Top-k
                        param_7: 1.1,      //Repititon-pently
        });

        console.log(result.data);
        res.status(200).json({
            result: result.data
        });
    }

    static async getTexttoImage(req:Request,res:Response){
        const { input_text } = req.body;
        console.log(`input text is:${input_text}`);
            axios.post('https://shibadeveloper-text-to-image.hf.space/run/predict', {
            data: [input_text]
            })
            .then(response => {
            const data = response.data.data;
            // do something with the data
                res.status(200).json({
                    result:data
                })
            })
            .catch(error => {
            console.error(error);
            res.status(500).json({
                error: error
            })
            });

    }

    // static async getGradioClient(){
    //     const dynamic = new Function('modulePath', 'return import(modulePath)');
    //     const { Client} =  await dynamic('@gradio/client');
        
    // }

   

}