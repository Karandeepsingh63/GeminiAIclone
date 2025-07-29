
import { GoogleGenAI } from '@google/genai';

const runChat = async (prompt) => {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCk_lOWN1lGF37Q8XyPsDvCX7rjsAcbEc0",
  });

  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-1.5-flash';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt, 
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullResponse = '';

  for await (const chunk of response) {
    fullResponse += chunk.text;
  }
  
  console.log(fullResponse);
  return fullResponse;
  

};

export default runChat;

