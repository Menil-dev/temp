import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import db from "../../firebase/firebaseConfig";
import OngoingQuiz from "./OngoingQuiz";

const Quiz = () => {
  const [quizTitles, setQuizTitles] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const quizzesRef = ref(db, "quizzes");
    onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setQuizTitles(Object.keys(data));
      }
    });
  }, []);

  const handleQuizComplete = (finalScore, total) => {
    setScore({ score: finalScore, total });
    setSelectedQuiz(null); // Optional: return to list after quiz
  };

  return (
    <div>
      <h2>Quiz App</h2>

      {!selectedQuiz && !score && (
        <>
          <h3>Select a Quiz:</h3>
          {quizTitles.map((title, index) => (
            <button key={index} onClick={() => setSelectedQuiz(title)}>
              {title}
            </button>
          ))}
        </>
      )}

      {selectedQuiz && (
        <OngoingQuiz quizTitle={selectedQuiz} onQuizComplete={handleQuizComplete} />
      )}

      {score && (
        <div>
          <h3>Quiz Finished!</h3>
          <p>Your Score: {score.score} / {score.total}</p>
          <button onClick={() => setScore(null)}>Take Another Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
