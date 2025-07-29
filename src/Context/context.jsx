




import { createContext, useState } from "react";
import runChat from "../Config/gemini";

export const context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevpromt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Typing animation word by word
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // New chat resets result
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
  };

  // Format and animate the response
  const formatResponse = (text) => {
    let responseArray = text.split("**");
  let newResponse = '';

for (let i = 0; i < responseArray.length; i++) {
  if (i % 2 === 0) {
    newResponse += responseArray[i];
  } else {
    newResponse += `<b>` + responseArray[i] + `</b>`;
  }
}

    // Replace * with line breaks, then split into words
    return newResponse.split("*").join("</br>").split(" ");
  };

  // Handle sending prompt
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let finalPrompt = prompt || input;
    setRecentPrompt(finalPrompt);

    if (!prompt) {
      setPrevpromt((prev) => [...prev, input]);
    }

    const response = await runChat(finalPrompt);
    const formattedWords = formatResponse(response);

    formattedWords.forEach((word, index) => {
      delayPara(index, word + " ");
    });

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompt,
    setPrevpromt,
    onSent,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <context.Provider value={contextValue}>
      {props.children}
    </context.Provider>
  );
};

export default ContextProvider;


