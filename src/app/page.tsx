"use client"
import ChatBot from "@/components/chatbot";
import Sidebar from "@/components/sidebar";
import UploadComponent from "@/components/upload";
import Quiz from "@/components/quiz";
import { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="flex h-screen bg-white border-2 border-gray-200">
      <Sidebar onToggle={setIsSidebarOpen}/>
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatBot onStartQuiz={() => setQuizStarted(true)} />
        {quizStarted && <Quiz onClose={() => setQuizStarted(false)} />}
      </div>
    </div>
  );
}
