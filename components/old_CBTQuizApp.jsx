'use client';

import { useState } from "react";
import { questions } from "@/data/questions"; // 문제은행 import
import { motion } from "framer-motion";

// 🧠 CBT 퀴즈 앱 메인 컴포넌트
export default function CBTQuizApp() {
  const [current, setCurrent] = useState(0); // 현재 문제 번호
  const [selected, setSelected] = useState(null); // 선택된 보기
  const [score, setScore] = useState(0); // 정답 개수
  const [finished, setFinished] = useState(false); // 퀴즈 완료 여부
  const [results, setResults] = useState([]); // 응답 기록

  const currentQ = questions[current];

  // 다음 문제로 이동
  const next = () => {
    const isCorrect = selected === currentQ.answer;
    if (isCorrect) setScore(score + 1);
    setResults([
      ...results,
      {
        ...currentQ,
        selected,
        isCorrect
      }
    ]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  // 오답만 다시 풀기
  const retryIncorrect = () => {
    const incorrect = results.filter(r => !r.isCorrect);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setResults([]);
    setQuestions(incorrect);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {!finished ? (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white shadow p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-bold text-black">문제 {current + 1}</h2>
            <p className="text-black">{currentQ.question}</p>
            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => (
                <label key={idx} className="flex items-start gap-2 text-black">
                  <input
                    type="radio"
                    name={`q${current}`}
                    value={idx}
                    checked={selected === idx}
                    onChange={() => setSelected(idx)}
                    className="mt-1"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {selected !== null && (
              <div className="text-sm mt-2">
                {selected === currentQ.answer ? (
                  <p className="text-green-600">✅ 정답입니다!</p>
                ) : (
                  <p className="text-red-600">
                    ❌ 오답입니다. 정답: {currentQ.options[currentQ.answer]}
                  </p>
                )}
                <p className="mt-1 text-black">💡 해설: {currentQ.explanation}</p>
              </div>
            )}
            <button
              onClick={next}
              disabled={selected === null}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              다음
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="text-center space-y-4 bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-black">결과</h2>
          <p className="text-black">총 {questions.length}문제 중 {score}문제를 맞혔습니다.</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => { setCurrent(0); setScore(0); setSelected(null); setFinished(false); setResults([]); }} className="px-4 py-2 bg-blue-600 text-white rounded">다시 풀기</button>
          </div>
        </div>
      )}
    </div>
  );
}