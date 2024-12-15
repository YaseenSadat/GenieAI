/*
   This component defines the sidebar for the GenieAI application. 
   It provides user navigation functionality, including starting new chats, viewing recent prompts, 
   and accessing features like settings, help, and activity logs. It uses the Context API 
   for managing application state and dynamic user interactions.
*/

import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
    // Local state for toggling extended mode in the sidebar
    const [extended, setExtended] = useState(false);

    // Context API for managing global application state
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    // Loads a previously used prompt into the main input and sends it
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt); // Set the prompt as the current active prompt
        await onSent(prompt);    // Trigger the AI response for the prompt
    };

    return (
        <div className="sidebar">
            {/* Top section containing menu toggle and new chat functionality */}
            <div className="top">
                <img
                    onClick={() => setExtended((prev) => !prev)} // Toggles the extended view of the sidebar
                    className="menu"
                    src={assets.menu_icon}
                    alt=""
                />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null} {/* Show text only in extended mode */}
                </div>

                {/* Display recent prompts only when in extended mode */}
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => loadPrompt(item)} // Loads the selected prompt
                                    className="recent-entry"
                                >
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)} ...</p> {/* Display truncated prompt */}
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>

            {/* Bottom section for accessing help, activity logs, and settings */}
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null} {/* Show text only in extended mode */}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null} {/* Show text only in extended mode */}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null} {/* Show text only in extended mode */}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
