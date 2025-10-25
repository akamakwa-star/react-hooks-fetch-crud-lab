import React, { useEffect, useState } from "react";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setQuestions(data);
      })
      .catch(console.error);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1>Quiz Admin Panel</h1>

      <button onClick={() => setShowQuestions(!showQuestions)}>
        {showQuestions ? "Hide Questions" : "View Questions"}
      </button>

      {showQuestions && (
        <section>
          <h2>Quiz Questions</h2>
          <ul>
            {questions.map((q) => (
              <li key={q.id}>{q.prompt}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2>New Question</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Form submission logic here (not implemented for brevity)
          }}
        >
          <label>
            Prompt:
            <input name="prompt" type="text" />
          </label>
          {/* other inputs omitted for brevity */}
          <button type="submit">Add Question</button>
        </form>
      </section>
    </div>
  );
}
