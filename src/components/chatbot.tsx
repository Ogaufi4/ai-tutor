"use client"
import React, { useState } from "react";
import { getChatResponse } from "@/app/lib/openai";
import UploadComponent from "@/components/upload";

type Message = {
  from: "bot" | "user";
  text: string;
};

const ChatBot: React.FC<{ onStartQuiz: () => void }> = ({ onStartQuiz }) => {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hello! Are you ready for today's lesson?" },
  ]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);

  const updateChat = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBotTyping(true);

    try {
      const botResponse = await getChatResponse([
        { role: "user", content: input },
      ]);
      const botMessage: Message = { from: "bot", text: botResponse.content };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting response from OpenAI:", error);
      const errorMessage: Message = { from: "bot", text: "Sorry, I couldn't process that. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white p-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.from === "bot" ? "items-start" : "justify-end"}`}>
            <div className={`px-4 py-3 rounded-xl ${message.from === "bot" ? "bg-gray-100 text-gray-600" : "bg-blue-500 text-white"}`}>
              {message.text}
            </div>
          </div>
        ))}
        {botTyping && <div className="text-gray-500">Typing...</div>}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4">
        <div className="flex items-center">
          <UploadComponent />
          <input
            type="text"
            placeholder="Say something..."
            className="flex-1 border rounded-full px-4 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateChat()}
          />
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full"
            onClick={updateChat}
          >
            Send
          </button>
          <button
            className="ml-2 bg-green-500 text-white px-4 py-2 rounded-full"
            onClick={onStartQuiz}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
