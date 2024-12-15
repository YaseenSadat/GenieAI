/*
   This file integrates the OpenAI API into the GenieAI application. 
   It provides a function, `runChat`, for sending user prompts to the API and returning responses. 
   The API key is securely loaded using environment variables.
*/

import OpenAI from "openai";

// Initialize OpenAI with API key and browser compatibility settings
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, // API key stored in environment variables
    dangerouslyAllowBrowser: true, // Enables usage in browser-based applications
});

/**
 * Sends a user prompt to the OpenAI API and returns the response.
 * @param {string} prompt - The user's input or question.
 * @returns {Promise<string>} - The API's response content.
 */
const runChat = async (prompt) => {
    try {
        // Make an API request to OpenAI's chat endpoint
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Model to use for processing the prompt
            messages: [{ role: "user", content: prompt }], // User message sent to the API
        });

        // Return the AI's response content
        return response.choices[0].message.content.trim();
    } catch (error) {
        // Log and handle errors from the OpenAI API
        console.error("Error with OpenAI API:", error);
        return "An error occurred while connecting to OpenAI. Please try again.";
    }
};

export default runChat;
