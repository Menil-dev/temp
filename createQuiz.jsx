import { useState } from "react";
import db from "../../firebase/firebaseConfig";
import { ref, set } from "firebase/database";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: 0 }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: 0 }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "question") updated[index].question = value;
    else updated[index].options[field] = value;
    setQuestions(updated);
  };

  const handleSave = () => {
    const quizRef = ref(db, `quizzes/${quizTitle}`);
    console.log(quizTitle);
    console.log(questions);
    set(quizRef, { title: quizTitle, questions })
    .then(()=>{
      alert("Quiz Created!");
    })
    .catch((error)=>{
      console.log("Error creating quiz: ",error);
    })
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <input placeholder="Quiz Title" onChange={(e) => setQuizTitle(e.target.value)} />
      {questions.map((q, i) => (
        <div key={i}>
          <input placeholder="Question" onChange={(e) => handleChange(i, "question", e.target.value)} />
          {q.options.map((opt, j) => (
            <input
              key={j}
              placeholder={`Option ${j + 1}`}
              onChange={(e) => handleChange(i, j, e.target.value)}
            />
          ))}
          <select onChange={(e) => (q.answer = parseInt(e.target.value))}>
            <option value="0">Correct Option: 1</option>
            <option value="1">2</option>
            <option value="2">3</option>
            <option value="3">4</option>
          </select>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSave}>Save Quiz</button>
    </div>
  );
};

export default CreateQuiz;
