import React, { useEffect, useState } from "react";

// Question.js renders, create a side effect using useEffect and use setTimeout to run a callback function after 1 second(1000). (done)
// Inside the callback function for setTimeout, use the setTimeRemaining function to decrease the amount of time remaining by 1 every 1 second. (done)
// When timeRemaining hits 0, do the following:
  // reset timeRemaining back to 10 seconds, so our next question will have a fresh timer; and (done)
  // call the onAnswered callback prop with a value of false (onAnswered(false)), to trigger some behavior in the App component. (done)

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // a callback function after 1 second -- 1000
  useEffect(() => {
    if (timeRemaining >= 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000);
      return () => clearTimeout(timer)
    } else {
      onAnswered(false)
      setTimeRemaining(10)
    }
  }, [onAnswered, timeRemaining])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button  key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
