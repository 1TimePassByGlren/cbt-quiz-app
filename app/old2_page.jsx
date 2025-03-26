'use client';
import CBTQuizApp from "../components/CBTQuizApp";

export default function Page() {
  return (
    <>
      <CBTQuizApp />
      <footer className="text-center text-sm text-gray-500 mt-10">
        © 2025 <a href="https://cafe.naver.com/1timepass" className="text-yellow-600 underline" target="_blank" rel="noopener noreferrer">시험을 한번에 합격하는 방법</a> | All rights reserved.
      </footer>
    </>
  );
}
