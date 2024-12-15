/*
   This file provides the global state management for the GenieAI application using React's Context API. 
   It manages user input, prompts, API responses, and loading states, making them accessible across components.
*/

import { createContext, useState } from "react";
import runChat from "../config/openai";

// Create the Context to share global state across components
export const Context = createContext();

const ContextProvider = (props) => {
    // State for managing user input in the search box
    const [input, setInput] = useState("");

    // State for storing the most recent user prompt
    const [recentPrompt, setRecentPrompt] = useState("");

    // State for tracking a history of user prompts
    const [prevPrompts, setPrevPrompts] = useState([]);

    // State for toggling the visibility of results
    const [showResult, setShowResult] = useState(false);

    // State to indicate if the AI response is being loaded
    const [loading, setLoading] = useState(false);

    // State for storing the data returned by the OpenAI API
    const [resultData, setResultData] = useState("");

    // Appends words with a delay to create a typing animation effect
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    // Resets the state for starting a new chat
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    // Handles sending a prompt to the OpenAI API and processing the response
    const onSent = async (prompt) => {
        setResultData(""); // Clear the previous result
        setLoading(true);  // Set loading state to true
        setShowResult(true); // Display the result area

        let response;

        // Check if a prompt is provided or use the current input
        if (prompt !== undefined) {
            response = await runChat(prompt); // Fetch the AI's response
            setRecentPrompt(prompt); // Save the recent prompt
        } else {
            setPrevPrompts((prev) => [...prev, input]); // Add input to the prompt history
            setRecentPrompt(input); // Save the input as the recent prompt
            response = await runChat(input); // Fetch the AI's response
        }

        // Process the response to format bold text and line breaks
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        // Replace single asterisks with line breaks
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");

        // Animate the response word by word
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false); // Set loading state to false
        setInput("");      // Clear the input field
    };

    // Context value to provide states and functions to child components
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children} {/* Renders child components that consume this context */}
        </Context.Provider>
    );
};

export default ContextProvider;
