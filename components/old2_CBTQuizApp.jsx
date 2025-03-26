'use client';

import { useState } from "react";
import { questions } from "@/data/questions";
import { motion } from "framer-motion";

// 🧠 CBT 퀴즈 앱 메인 컴포넌트
export default function CBTQuizApp() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState([]);

  const currentQ = questions[current];

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

  const retryIncorrect = () => {
    const incorrect = results.filter((r) => !r.isCorrect);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setResults([]);
  };

  const getWeakAreas = () => {
    const summary = {};
    results.forEach((r) => {
      if (!summary[r.topic]) summary[r.topic] = { total: 0, incorrect: 0 };
      summary[r.topic].total++;
      if (!r.isCorrect) summary[r.topic].incorrect++;
    });
    return summary;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
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
                  <p className="text-green-600 font-semibold">✅ 정답입니다!</p>
                ) : (
                  <p className="text-red-600 font-semibold">
                    ❌ 오답입니다. 정답: {currentQ.options[currentQ.answer]}
                  </p>
                )}
                <p className="mt-1 text-gray-800">💡 해설: {currentQ.explanation}</p>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <a
                href={`mailto:report@gmail.com?subject=문제 ${currentQ.id} 신고&body=문제 내용: ${currentQ.question}%0D%0A오류 내용:`}
                className="text-blue-600 text-sm underline"
              >
                이 문제 신고하기
              </a>
              <button
                onClick={next}
                disabled={selected === null}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                다음
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="text-center space-y-4 bg-white shadow p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-black">결과</h2>
          <p className="text-black">
            총 {questions.length}문제 중 {score}문제를 맞혔습니다.
          </p>
          <div className="text-left mt-4 space-y-2">
            <h3 className="text-lg font-semibold text-black">📊 약점 분석</h3>
            {Object.entries(getWeakAreas()).map(([topic, { total, incorrect }]) => (
              <p key={topic} className="text-gray-800">
                <strong>{topic}</strong>: {incorrect}문제 틀림 / 총 {total}문제 ({Math.round((incorrect / total) * 100)}%)
              </p>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setSelected(null);
                setFinished(false);
                setResults([]);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              다시 풀기
            </button>
            <button
              onClick={retryIncorrect}
              className="px-4 py-2 border border-blue-400 rounded text-black"
            >
              오답만 다시 풀기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}