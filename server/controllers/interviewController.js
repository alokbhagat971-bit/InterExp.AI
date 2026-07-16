import fs from 'fs'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import { askAi } from '../services/geminiServices.js'
import { generateSpeech } from '../services/ttsService.js'
import User from '../models/user.js'
import Interview from '../models/interviewModel.js'

export const analyzeResume = async (req,res) => {
  try{
      if(!req.file){
        return res.status(400).json({ message : "Resume required"})
      }
      const filepath = req.file.path

      const fileBuffer = await fs.promises.readFile(filepath)
      const uint8Array = new Uint8Array(fileBuffer)

      const pdf = await pdfjsLib.getDocument({data:uint8Array}).
      promise;

      let resumeText = "";

      for(let pageNum = 1;pageNum <= pdf.numPages; pageNum++){
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();

        const pageText = content.items.map(item => item.str).join(" ");
        resumeText += pageText + "\n";
      }

      resumeText = resumeText
      .replace(/\s+/g," ")
      .trim();

      const messages = [
  {
    role: "system",
    content: `Extract structured data from resume.

Return strictly JSON:

{
  "role": "string",
  "experience": "string",
  "projects": ["project1", "project2"],
  "skills": ["skill1", "skill2"]
}`
  },
  {
    role: "user",
    content: resumeText
  }
];


  const aiResponse = await askAi(messages);

const cleanedResponse = aiResponse
  .replace(/^```json\s*/i, "")
  .replace(/^```\s*/i, "")
  .replace(/\s*```$/, "")
  .trim();

const result = JSON.parse(cleanedResponse);

  fs.unlinkSync(filepath)

  res.json({
  role: result.role,
  experience: result.experience,
  projects: result.projects,
  skills: result.skills,
  resumeText
});


  }catch(error){
    console.error(error);

    if(req.file && fs.existsSync(req.file.path)){
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ message: error.message });
  }
}

export const generateQuestion = async (req,res) => {
  try{
    let {role, experience, mode, resumeText, projects, skills} = req.body;

    role=role?.trim();
    experience=experience?.trim();
    mode=mode?.trim();


    if(!role || !experience || !mode){
      return res.status(400).json({message:"Missing required fields"})
    }

    const user = await User.findById(req.userId);

    if(!user){
      return res.status(404).json({message:"User not found"})
    };

    if(user.credits < 50){
      return res.status(400).json({message:"Insufficient credits"})
    }

    const projectText = Array.isArray(projects) && projects.length > 0 ? projects.join(", ") : "None";

    const skillsText = Array.isArray(skills) && skills.length > 0 ? skills.join(", ") : "None";

    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
    Role:${role}
    Experience:${experience}
    Projects:${projectText}
    Skills:${skillsText}
    Resume:${safeResume}
    InterviewMode:${mode}
    `;

    if(!userPrompt.trim()){
      return res.status(400).json({message:"Invalid prompt"})
    }

    const messages = [

      {
        role: "system",
        content: `
You are a real human interviewer conducting a professional interview.

Speak in simple, natural English as if you are directly talking to the candidate.

Generate exactly 6 interview questions.

Strict Rules:
- Each question must contain between 15 and 25 words.
- Each question must be a single complete sentence.
- Do NOT number them.
- Do NOT add explanations.
- Do NOT add extra text before or after.
- One question per line only.
- Keep language simple and conversational.
- Questions must feel practical and realistic.

Difficulty progression:
Question 1 → easy  
Question 2 → easy  
Question 3 → medium  
Question 4 → medium  
Question 5 → hard
Question 6 → hard

Make questions based on the candidate’s role, experience,interviewMode, projects, skills, and resume details.
`
      }
      ,
      {
        role: "user",
        content: userPrompt
      }
    ];

    const aiResponse = await askAi(messages);

    if(!aiResponse || typeof aiResponse !== "string" || aiResponse.trim().length === 0){
      return res.status(500).json({message:"Invalid response from AI"})
    }

    const questions = aiResponse.split("\n").map(q => q.trim()).filter(q => q.length > 0).slice(0,6);

    if(questions.length === 0){
      return res.status(500).json({message:"AI Failed to generate questions"})
    }

    user.credits-=50;
    await user.save();

    const interview = await Interview.create({
      userId: req.userId,
      role,
      experience,
      mode,
      resumeText: safeResume,
      questions: questions.map((q,index) => ({
        question:q,
        difficulty: ["easy","easy","medium","medium","hard","hard"][index],
        timeLimit: [60, 60, 90, 90, 120, 120][index],
      }))
    })

    res.json({ 
      interviewId: interview._id,
      creditsLeft: user.credits,
      userName: user.name,
      questions:interview.questions
     });

  }catch(error){
    console.error(error);
    return res.status(500).json({ message: `Failed to create interview: ${error.message}` });
  }
}

export const submitAnswer = async (req,res) => {
  try{
    const {interviewId, questionIndex, answer, timeTaken} = req.body;

    const interview = await Interview.findById(interviewId)
    const question = interview.questions[questionIndex];

    if(!answer){
      question.score=0;
      question.feedback="No answer provided";
      question.answer="";

      await interview.save();
      return res.json({
        feedback: question.feedback,
      });
    }

    if(timeTaken > question.timeLimit){
      question.score=0;
      question.feedback="Time limit exceeded";
      question.answer=answer;

      await interview.save();
      return res.json({
        feedback: question.feedback,
      });
    }

    
const messages = [
      {
        role: "system",
        content: `
You are a professional human interviewer evaluating a candidate's answer in a real interview.

Evaluate naturally and fairly, like a real person would.

Score the answer in these areas (0 to 10):

1. Confidence – Does the answer sound clear, confident, and well-presented?
2. Communication – Is the language simple, clear, and easy to understand?
3. Correctness – Is the answer accurate, relevant, and complete?

Rules:
- Be realistic and unbiased.
- Do not give random high scores.
- If the answer is weak, score low.
- If the answer is strong and detailed, score high.
- Consider clarity, structure, and relevance.

Calculate:
finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

Feedback Rules:
- Write natural human feedback.
- 10 to 15 words only.
- Sound like real interview feedback.
- Can suggest improvement if needed.
- Do NOT repeat the question.
- Do NOT explain scoring.
- Keep tone professional and honest.

Return ONLY valid JSON in this format:

{
  "confidence": number,
  "communication": number,
  "correctness": number,
  "finalScore": number,
  "feedback": "short human feedback"
}
`
      }
      ,
      {
        role: "user",
        content: `
Question: ${question.question}
Answer: ${answer}
`
      }
    ];


    const aiResponse = await askAi(messages);

    if(!aiResponse || typeof aiResponse !== "string" || aiResponse.trim().length === 0){
      return res.status(500).json({message:"Invalid response from AI"})
    }

    const cleanedResponse = aiResponse
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const result = JSON.parse(cleanedResponse);

    question.answer=answer;
    question.confidence=result.confidence;
    question.communication=result.communication;
    question.correctness=result.correctness;
    question.score=result.finalScore;
    question.feedback=result.feedback;

    await interview.save();

    return res.status(200).json({

      feedback: question.feedback,
    });

 
  }catch(error){
    console.error(error);
    return res.status(500).json({ message:`Failed to evaluate answer: ${error.message}` });
  }
}

export const finishInterview = async (req,res) => {
  try{
    const {interviewId} = req.body;

    const interview = await Interview.findById(interviewId);

    if(!interview){
      return res.status(404).json({message:"Interview not found"})
    }

    const totalQuestions = interview.questions.length;

    let totalScore = 0;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalScore += q.score || 0;
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    const finalScore = totalQuestions > 0 ? Math.round(totalScore / totalQuestions) : 0;

    const averageConfidence = totalQuestions > 0 ? Math.round(totalConfidence / totalQuestions) : 0;
    const averageCommunication = totalQuestions > 0 ? Math.round(totalCommunication / totalQuestions) : 0;
    const averageCorrectness = totalQuestions > 0 ? Math.round(totalCorrectness / totalQuestions) : 0;

    interview.finalScore = finalScore;
    interview.status = "Completed";
    await interview.save();

    return res.status(200).json({
      finalScore:Number(finalScore.toFixed(1)),
      confidence:Number(averageConfidence.toFixed(1)),
      communication:Number(averageCommunication.toFixed(1)),
      correctness:Number(averageCorrectness.toFixed(1)),
      questionWiseScore : interview.questions.map((q) => ({
        question: q.question,
        score: q.score || 0,
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
        feedback: q.feedback || "",
      })),
    });
  }catch(error){
    console.error(error);
    return res.status(500).json({ message:`Failed to complete interview: ${error.message}` });
  }
}

export const textToSpeech = async (req, res) => {
  try {
    const { text, gender } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const audioBuffer = await generateSpeech(text.trim(), gender);

    res.set('Content-Type', 'audio/mpeg');
    res.set('Content-Length', audioBuffer.length);
    res.send(audioBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `TTS failed: ${error.message}` });
  }
}


export const getMyInterviews = async (req,res) => {
  try{
    const interview = await Interview.find({userId:req.userId})
    .sort({createdAt:-1})
    .select("role experience mode finalScore status createdAt");

    return res.status(200).json(interview)
  }catch(error){
    return res.status(500).json({message:`failed to find currentUser Interview ${error}`})
  }
}

export const getInterviewReport = async (req,res) => {
  try{
    const interview = await Interview.findById(req.params.id);

    if(!interview){
      return res.status(404).json({message:"Interview not found"})
    }

    const totalQuestions = interview.questions.length;

    let totalScore = 0;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalScore += q.score || 0;
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    const finalScore = totalQuestions > 0 ? Math.round(totalScore / totalQuestions) : 0;

    const averageConfidence = totalQuestions > 0 ? Math.round(totalConfidence / totalQuestions) : 0;
    const averageCommunication = totalQuestions > 0 ? Math.round(totalCommunication / totalQuestions) : 0;
    const averageCorrectness = totalQuestions > 0 ? Math.round(totalCorrectness / totalQuestions) : 0;

    return res.json({
      finalScore: interview.finalScore,
      confidence: Number(averageConfidence.toFixed(1)),
      communication:Number(averageCommunication.toFixed(1)),
      correctness:Number(averageCorrectness.toFixed(1)),
      questionWiseScore:interview.questions
    });
  }catch(error){
      return res.status(500).json({message:`failed to find currentUser Interview ${error}`})
  }
}