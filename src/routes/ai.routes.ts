import * as express from 'express'
import { AIController } from '../controlllers/ai.controller';


const router = express.Router();

router.post('/openchat',AIController.aichat);
router.post('/chat2',AIController.chat2);
router.post('/texttoimage',AIController.getTexttoImage);



export { router as AIRouter}