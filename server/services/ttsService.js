import { EdgeTTS } from '@andresaya/edge-tts';

const VOICE_MALE = 'zh-CN-YunxiNeural';
const VOICE_FEMALE = 'zh-CN-XiaoxiaoNeural';

export const generateSpeech = async (text, gender = 'male') => {
  try {
    const voice = gender === 'female' ? VOICE_FEMALE : VOICE_MALE;

    const tts = new EdgeTTS();

    await tts.synthesize(text, voice, {
      rate: '-8%',
      pitch: '+0Hz',
      volume: '+0%',
    });

    const audioBuffer = tts.toBuffer();
    return audioBuffer;
  } catch (error) {
    console.error('TTS generation failed:', error);
    throw new Error('Failed to generate speech');
  }
};

export const listVoices = async () => {
  const tts = new EdgeTTS();
  const voices = await tts.getVoices();
  return voices;
};