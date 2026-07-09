import express from 'express';
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
import { analyzeResume, generateQuestion, submitAnswer, finishInterview, textToSpeech, getMyInterviews, getInterviewReport } from '../controllers/interviewController.js'

const interviewRouter = express.Router();

interviewRouter.post("/resume",isAuth,upload.single("resume"),analyzeResume)

interviewRouter.post("/generate-questions",isAuth,generateQuestion);
interviewRouter.post("/submit-answers",isAuth,submitAnswer);
interviewRouter.post("/finish",isAuth,finishInterview);
interviewRouter.post("/tts",isAuth,textToSpeech);

interviewRouter.get("/get-interview",isAuth,getMyInterviews);
interviewRouter.get("/report/:id",isAuth,getInterviewReport);


export default interviewRouter;