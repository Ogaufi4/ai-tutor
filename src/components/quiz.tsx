'use client';

import React, { useState } from 'react';
import { quiz } from '../data/QuestionSet';
import ScoreCard from './scorecard';

const Quiz = ({ onClose }: { onClose: () => void }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answerChecked, setAnswerChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [name, setName] = useState('');
  const [nameEntered, setNameEntered] = useState(false);

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[currentQuestionIndex];

  const onAnswerSelected = (answer: string, idx: number) => {
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer);
    setAnswerChecked(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === correctAnswer) {
      setQuizResult((prev) => ({
        ...prev,
        score: prev.score + 5,
        correctAnswers: prev.correctAnswers + 1,
      }));
    } else {
      setQuizResult((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
    if (currentQuestionIndex !== questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
    setSelectedAnswer('');
    setSelectedAnswerIndex(null);
    setAnswerChecked(false);
  };

  const handleNameSubmit = () => {
    if (name.trim()) {
      setNameEntered(true);
    } else {
      alert("Please enter your name to start the quiz.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          Close
        </button>
        <div>
          {!nameEntered ? (
            <div className="p-4 flex gap-6">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
              />
              <button onClick={handleNameSubmit} className="ml-2 btn btn-primary ">
                Start Quiz
              </button>
            </div>
          ) : !showResults ? (
            <div className="card p-4">
              <h4>{question}</h4>
              <ul className="list-group">
                {answers.map((answer, idx) => (
                  <li
                    key={idx}
                    onClick={() => onAnswerSelected(answer, idx)}
                    className={`list-group-item cursor-pointer ${selectedAnswerIndex === idx ? ' text-black' : ''}`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={selectedAnswerIndex === idx}
                      onChange={() => onAnswerSelected(answer, idx)}
                      className="mr-2"
                    />
                    {answer}
                  </li>
                ))}
              </ul>
              <div className="flex gap-5 justify-content-between mt-3">
                <b>
                  Question {currentQuestionIndex + 1}/{questions.length}
                </b>
                <button
                  onClick={handleNextQuestion}
                  className="btn btn-primary"
                  disabled={!answerChecked}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next Question'}
                </button>
              </div>
            </div>
          ) : (
            <ScoreCard quizResult={quizResult} questions={questions} name={name} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

// Ensure the Quiz component is imported and used correctly in the parent component
// Example usage in a parent component:

// import Quiz from './components/quiz';

// const ParentComponent = () => {
//   const [showQuiz, setShowQuiz] = useState(false);

//   const handleOpenQuiz = () => setShowQuiz(true);
//   const handleCloseQuiz = () => setShowQuiz(false);

//   return (
//     <div>
//       <button onClick={handleOpenQuiz}>Start Quiz</button>
//       {showQuiz && <Quiz name="User" onClose={handleCloseQuiz} />}
//     </div>
//   );
// };

// export default ParentComponent;
