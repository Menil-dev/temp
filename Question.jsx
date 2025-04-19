import React from "react";

const Question = ({ questionData, onAnswerSelect, questionNumber, total }) => {
  return (
    <div>
      <p><strong>Q{questionNumber}:</strong> {questionData.question}</p>
      {questionData.options.map((opt, i) => (
        <button key={i} onClick={() => onAnswerSelect(i)}>{opt}</button>
      ))}
      <p>Question {questionNumber} of {total}</p>
    </div>
  );
};

export default Question;
