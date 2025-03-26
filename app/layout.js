export const metadata = {
  title: "CBT Quiz App",
  description: "1~40번 문제 연동된 CBT 퀴즈앱"
};
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
<footer className="text-center text-sm text-gray-500 mt-10">
  © 2025 <a href="https://yourblog.com" className="text-blue-600 underline" target="_blank">yourblog.com</a> | All rights reserved.
</footer>